import type { NextApiRequest, NextApiResponse } from "next";

// This acts as a Proxy between the client and the API
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const location = req.query?.loc;
  if (!location) return res.status(400).send("Bad Request");

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${req.query.loc}&appid=${process.env.OPENWEATHER_KEY}`
  )
    .then((res) => res.json())
    .then((weather) => res.status(200).json(weather))
    .catch((e) => {
      console.warn(`Had an error fetching weather data: ${e.message}`);
      return res.status(500).send("Internal Server Error");
    });
}
