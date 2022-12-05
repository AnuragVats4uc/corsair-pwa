#!/bin/bash

pwa_date=`date +%F`

#EXTRACT STORE CODES TO AN ARRY
IFS=', ' read -r -a STORES <<< "${STORE_CODES}"

#Install Workbox CLI
#npm install workbox-cli --global

# Generate Artifact
echo -e "//registry.npmjs.org/:_authToken="${NPM_TOKEN} >> ~/.npmrc
yarn install
rm ~/.npmrc
if [ ${#STORES[@]} -gt 1 ]; then
   echo  "========= Compiling Multi-Store build ========="
   # We don't use CHECKOUT_BRAINTREE_TOKEN but PWA Studio requires a value set for it.
   NODE_OPTIONS="--max-old-space-size=8192" NEXT_PUBLIC_ENVIRONMENT=${ENVIRONMENT} NEXT_PUBLIC_X_PYLOT_BACKEND=${X_PYLOT_BACKEND} NEXT_PUBLIC_STORE_CODE=${BASE_STORE_CODE} NEXT_PUBLIC_API_GATEWAY_URL=${DEV_API_GATEWAY_URL} API_GATEWAY_URL=${DEV_API_GATEWAY_URL} INSTANCE="dev" yarn build:prod:all
else
   echo  "========= Compiling Single-Store build ========="
   NODE_OPTIONS="--max-old-space-size=8192" NEXT_PUBLIC_ENVIRONMENT=${ENVIRONMENT} NEXT_PUBLIC_X_PYLOT_BACKEND=${X_PYLOT_BACKEND} NEXT_PUBLIC_STORE_CODE=${BASE_STORE_CODE} NEXT_PUBLIC_API_GATEWAY_URL=${DEV_API_GATEWAY_URL} API_GATEWAY_URL=${DEV_API_GATEWAY_URL} INSTANCE="dev" yarn build
fi  

mkdir -p /tmp/pwa
rm -rf /tmp/pwa/*

#######################################################
#########    CREATE STORE ARTIFACTS   #################
#######################################################

for STORE_CODE in "${STORES[@]}"
do
   mkdir /tmp/pwa/${STORE_CODE}
   #Copy code for this store only
   cp -r . /tmp/pwa/${STORE_CODE}
done

##########################################################
#########    DEV DEPLOYMENT CODE BELOW   #################
##########################################################
RELEASE_NAME="`date +%Y%m%d%H%M%S`"
RELEASE_PATH="$DEV_SERVER_PROJECT_PATH/releases/$RELEASE_NAME"
ENV_PATH="$DEV_SERVER_PROJECT_PATH/shared"
SERVER=${DEV_SERVER_SSH_DETAILS}
SERVER_PORT=22
echo  "========= create release directory ========="
ssh $SERVER -p$SERVER_PORT "mkdir $RELEASE_PATH"
echo  "========= Copying artifact to web dir============="
scp -r /tmp/pwa/${STORE_CODE} $SERVER:/$RELEASE_PATH/ 

############################################################
############    YARN INSTALL FOR ALL STORES   ###############
############################################################
echo "############    YARN INSTALL FOR ALL STORES   ###############"
for STORE_CODE in "${STORES[@]}"
do
   #Copy .env 
   ssh $SERVER -p$SERVER_PORT "cp $ENV_PATH/${STORE_CODE}/.env $RELEASE_PATH/${STORE_CODE}/.env"
done

############################################################
############    STOP SERVICE FOR ALL STORES   ###############
############################################################
echo "############    STOP SERVICE FOR ALL SORES   ###############"
for STORE_CODE in "${STORES[@]}"
do
   echo  "========= Stopping Node service for ${STORE_CODE} =============="
   NODE_SERVICE_CODE="${BITBUCKET_REPO_SLUG}-${STORE_CODE}"
   ssh $SERVER -p$SERVER_PORT "cd $DEV_SERVER_PROJECT_PATH/current/${STORE_CODE}/ && /srv/forever/bin/forever stop ${NODE_SERVICE_CODE} 2> /dev/null || true"
done

##################################################
############    Update Symlinks    ###############
##################################################   
echo  "############    Update Symlinks    ###############"
ssh $SERVER -p$SERVER_PORT "rm -rf $DEV_SERVER_PROJECT_PATH/current"
ssh $SERVER -p$SERVER_PORT "ln -s $RELEASE_PATH $DEV_SERVER_PROJECT_PATH/current"

#############################################################
############    START SERVICE FOR ALL SORES   ###############
#############################################################
for STORE_CODE in "${STORES[@]}"
do
   echo  "################## Starting the Node service for ${STORE_CODE} ##################"
   NODE_SERVICE_CODE="${BITBUCKET_REPO_SLUG}-${STORE_CODE}"
   ssh $SERVER -p$SERVER_PORT "cd $RELEASE_PATH/${STORE_CODE}/ && INSTANCE="dev" \
    /srv/forever/bin/forever start -a --uid ${NODE_SERVICE_CODE} node_modules/next/dist/bin/next start -p ${DEV_INSTANCE_PORT}"
done

#####################################################
############    Remove older builds    ###############
#####################################################
echo  "========= Remove old releases ======="
ssh $SERVER -p$SERVER_PORT "cd $DEV_SERVER_PROJECT_PATH/releases && ls -t | tail -n+2 | xargs rm -rf"  
