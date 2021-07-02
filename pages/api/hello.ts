// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ApiResponse } from "@danielmat/api-utils"
import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Data>>
) {
  res.status(200).json({
    status: "success",
    name: "John Doe",
  })
}
