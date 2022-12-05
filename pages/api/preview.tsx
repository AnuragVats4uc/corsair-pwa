import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.query['off']) {
        res.clearPreviewData()
        return res.end()
    }
    res.setPreviewData(req.query)
    res.end()
}
