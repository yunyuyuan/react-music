import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { myAxios } from "~/http";

export default function SongDetail() {
  const [params] = useSearchParams();
  const [, setResult] = useState<{
    name: string;
    id: number;
    ar: {
      id: number;
      name: string;
    }[];
    alia: string[];
    pop: number;
    fee: number;
    al: {
      id: number;
      name: string;
      picUrl: string;
    };
    dt: number;
    noCopyrightRcmd: any;
    mv: number;
    single: number;
    originCoverType: number;
  }>();

  useEffect(() => {
    myAxios({
      url: `/song/detail?ids=${params.get("id")}`,
    }).then((res) => {
      const data = res.data;
      if (data.code === 200) {
        setResult(data.songs[0]);
      }
    });
  }, [params]);
  return (
    <div className="rm-song-detail">
      <div>
        <div className=""></div>
      </div>
    </div>
  );
}
