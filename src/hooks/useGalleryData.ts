import { useEffect, useState } from "react";
import { GalleryItem } from "../utils/types";

const API =
  "https://dev.iamalive.app/api/destinations/experience/learn-horse-riding-and-trot-down-a-private-forest-trail?fields=gallery";

export const useGalleryData = () => {
  const [data, setData] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((json) => {
        const gallery = json?.data?.gallery ?? [];
        setData(gallery);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};
