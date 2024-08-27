import type { NextApiRequest, NextApiResponse } from "next";
import type { AxiosError } from "axios";

import { authenticateRequest } from "../../utils/authenticateRequest";
import { axiosInstance } from "../../libs/axios";
import type { FailedResponse, SuccessResponse } from "../../types/api";

interface Province {
  id: string;
  name: string;
}

interface RajaongkirProvince {
  province_id: string;
  province: string;
}

interface Rajaongkir<T> {
  rajaongkir: {
    query: { id: string };
    status: { code: number; description: string };
    results: T;
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse<Province[]> | FailedResponse>
) {
  try {
    await authenticateRequest(req);
  } catch (error) {
    console.error(error);
    res.status(401).json({ status: "failed", message: "Invalid JWT Token" });
    return;
  }

  try {
    const { data: provinceResponse } = await axiosInstance.get<
      Rajaongkir<RajaongkirProvince[]>
    >("https://api.rajaongkir.com/starter/province", {
      headers: { key: process.env.API_KEY ?? "" },
    });

    res.status(200).json({
      status: "success",
      data: provinceResponse.rajaongkir.results.map(
        ({ province_id, province }) => {
          return { id: province_id, name: province };
        }
      ),
    });
  } catch (err) {
    const error = err as AxiosError;
    if (error.response === undefined && error.request === undefined) {
      console.error(new Error("Axios Error: ", { cause: error }));
      res.status(500).json({ status: "failed", message: "Server Error" });
    } else if (error.response === undefined) {
      console.error(new Error("Network Error: ", { cause: error }));
      res
        .status(503)
        .json({ status: "failed", message: "Service Unavailable" });
    } else {
      if (error.response.status === 400) {
        console.error(new Error("Invalid Key: ", { cause: error }));
      } else if (error.response.status >= 500) {
        console.error(new Error("Server Error: ", { cause: error }));
      }
      res.status(500).json({ status: "failed", message: "Server Error" });
    }
  }
}
