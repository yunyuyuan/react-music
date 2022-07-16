import { useState } from "react";
import {useDebounce} from "react-use";
import axios from "axios";

const keys = ["song", "singer", "mv", "album"];

export default function Search() {
  const [searchVal, setSearchVal] = useState("林俊杰");
  const [result, setResult] = useState({});
  
  const [,] = useDebounce(() => {
    axios({
      url: `${import.meta.env.VITE_API_URL}/getSmartbox?key=${searchVal}`,
      method: "get",
    }).then(res=> {
      if (res.status === 200) {
        const response = res.data.response;
        if (response.code === 0) {
          setResult(response.data);
        }
      }
    });

  }, 200, [searchVal]);

  return (
    <div>
      <div>
        <input
          className="border border-black mb-3"
          placeholder="搜索..."
          value={searchVal}
          onChange={({currentTarget}) => {
            setSearchVal(currentTarget.value);
          }}
        />
      </div>
      <div className="w-4/5 max-w-3xl border-solid border-slate-500">
        {
          keys.map(k => (
            <div key={k}>
              <p className="text-lg bg-slate-300">{result[k]?.name}:</p>
              {
                result[k]?.itemlist.map(item => (
                  <div key={item.id} className="flex border-solid border-b border-slate-400 items-center py-1">
                    {item.pic ? (<img className="w-12 h-12" src={item.pic}/>) : null}
                    {item.name}
                  </div>
                ))
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}