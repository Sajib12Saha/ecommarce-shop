"use client"

import { useEffect, useState } from "react"
import { dbBillboard } from "@/types/type"
import { getBillboards } from "@/actions/billboard"

export type BillboardsResponse = {
  data: dbBillboard[]
}

export function useBillboards() {
  const [data, setData] = useState<BillboardsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
        setLoading(true)
        getBillboards()
        .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [])

  return { data, loading, error }
}
