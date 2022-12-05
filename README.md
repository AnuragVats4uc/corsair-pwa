# Corra Pylot Framework

Development Instance URL: [pylot.pwa.corralive.com](https://pylot.pwa.corralive.com/)


## Features
- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Integrations - Platform Agnostic

## Integrations
Pylot integrates out-of-the-box with Magento. We plan to support all major ecommerce backends.


## Getting Started

<details>
<summary>I already own a Magento store. What should I do?</summary>
<br>
First thing you do is: <b>set your environment variables</b>
<br>
<br>
.env

```sh
API_GATEWAY_URL=https://dev.gateway.pylot.store/graphql
NEXT_PUBLIC_API_GATEWAY_URL=$API_GATEWAY_URL
NEXT_PUBLIC_STORE_CODE=$BASE_STORE_CODE
```
</details>

<details>
<summary>How to run framework in Docker container?</summary>
<br>
<ul>
<li><b>Build Docker Image</b>: Go to root folder and execute below command.

```sh
docker build --build-arg NPM_TOKEN={Your-NPM-Token} -t pylot-framework .
```
Above command will create a docker image using https://dev.gateway.pylot.store/graphql as API_GATEWAY_URL. If you want to build an image with custom API_GATEWAY_URL, use command below.

```sh
docker build --build-arg NPM_TOKEN={Your-NPM-Token} --build-arg API_GATEWAY_URL={CUSTOM_API_GATEWAY_URL} -t pylot-framework .
```
</li>
<li>Run the container: Execute below command to run the container. This will start the container and expose application on port 3000

```sh
docker run -p3000:3000 --name pylot-framework pylot-framework 
```
</li>
<li>Your application  is now available on http://localhost:3000</li>
</ul>
<br>
<br>
</details>