import "./index.scss";

import axios from "axios";
import { useState } from "react";
import { useDebounce } from "react-use";

import SvgIcon from "~/components/SvgIcon";
import RmTable from "~/components/table";
import { searchType, searchTypeKeys } from "~/http/netease/search";

const keys = ["song", "singer", "mv", "album"];

export default function Search() {
  const [searchFocus, setFocus] = useState(false);
  const [searching, setSearching] = useState(false);

  const [searchVal, setSearchVal] = useState("林");
  const [selectedType, setSearchType] = useState<number>(1);
  const [result, setResult] = useState<any>({
    "hasMore": true,
    "artistCount": 562,
    "hlWords": [
      "a"
    ],
    "artists": [
      {
        "id": 7063,
        "name": "黄丽玲",
        "picUrl": "https://p2.music.126.net/vwAaR1GsU-GpNCk9QnXaDg==/109951166653150223.jpg",
        "alias": [
          "A-Lin"
        ],
        "albumSize": 47,
        "picId": 109951166653150220,
        "img1v1Url": "https://p2.music.126.net/ujjsZm_3NCFzWa6FYyEgAA==/109951167492478285.jpg",
        "accountId": 3251792543,
        "img1v1": 109951167492478290,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 93,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "A-Lin"
        ],
        "trans": null
      },
      {
        "id": 35547742,
        "name": "APEX",
        "picUrl": "https://p2.music.126.net/NZvW5cAuu9hMZZdC0Vaxkg==/109951165057279698.jpg",
        "alias": [],
        "albumSize": 1,
        "picId": 109951165057279700,
        "img1v1Url": "https://p2.music.126.net/bc4bF5Dg3eBkNcCyXD689g==/109951165057276292.jpg",
        "accountId": 338373222,
        "img1v1": 109951165057276290,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 1,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 6066,
        "name": "杨宗纬",
        "picUrl": "https://p2.music.126.net/5_0ux0Y9P5WTfW70zSP2wQ==/3243559305677511.jpg",
        "alias": [
          "Aska Yang"
        ],
        "albumSize": 24,
        "picId": 3243559305677511,
        "img1v1Url": "https://p2.music.126.net/Q4JSaV98wuU6xElATsFjAw==/3261151495434543.jpg",
        "accountId": 818067,
        "img1v1": 3261151495434543,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 55,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "Aska Yang"
        ],
        "trans": null
      },
      {
        "id": 12782624,
        "name": "4D",
        "picUrl": "https://p2.music.126.net/figHFuXAMWFKYx3Uckv9wQ==/109951164287253965.jpg",
        "alias": [],
        "albumSize": 9,
        "picId": 109951164287253970,
        "img1v1Url": "https://p2.music.126.net/iUtBdB3YmsKii7qvV1yATQ==/109951164287259763.jpg",
        "accountId": 34351716,
        "img1v1": 109951164287259760,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 6453,
        "name": "张震岳",
        "picUrl": "https://p2.music.126.net/inx_LaHuDMYK42zYxC0seQ==/6042915906863903.jpg",
        "alias": [
          "阿岳",
          "Chang Csun Yuk"
        ],
        "albumSize": 28,
        "picId": 6042915906863903,
        "img1v1Url": "https://p2.music.126.net/u2TW_Xfaq8RljUnmtYafDg==/5958253511243446.jpg",
        "accountId": 5158334,
        "img1v1": 5958253511243446,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 77,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "阿岳",
          "Chang Csun Yuk"
        ],
        "trans": null
      },
      {
        "id": 14018235,
        "name": "Kyra Zilver",
        "picUrl": "https://p2.music.126.net/t-0OsJWJH_rY0f_h0S1Z1w==/109951165592113446.jpg",
        "alias": [],
        "albumSize": 16,
        "picId": 109951165592113440,
        "img1v1Url": "https://p2.music.126.net/43SSX00KcatxJhedtZQ4Hg==/109951166199161274.jpg",
        "accountId": 1439520686,
        "img1v1": 109951166199161280,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 1,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 5205,
        "name": "谭咏麟",
        "picUrl": "https://p2.music.126.net/zGKD-9YlRQjSOtDuwSoX-A==/109951165639013476.jpg",
        "alias": [
          "Alan Tam",
          "Alan Tam3",
          "Alan Tamr2",
          "Alan Tam1",
          "谭校长",
          "谭校byasdfasfasfasfasfasfasdfasfsfsasdfafqew234r",
          "阿伦"
        ],
        "albumSize": 179,
        "picId": 109951165639013470,
        "img1v1Url": "https://p2.music.126.net/iIpva1JSEQLJVI5iAD8Gjg==/109951165639024212.jpg",
        "img1v1": 109951165639024210,
        "mvSize": 517,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "Alan Tam",
          "Alan Tam2",
          "Alan Tam1",
          "谭校长",
          "阿伦"
        ],
        "trans": null
      },
      {
        "id": 12293217,
        "name": "LEGGO",
        "picUrl": "https://p2.music.126.net/rM5sHAH3irsuPG-ztmYl5Q==/109951166196274393.jpg",
        "alias": [],
        "albumSize": 21,
        "picId": 109951166196274400,
        "img1v1Url": "https://p2.music.126.net/KxtXBftc1gEC4ytWbkYErw==/109951167404631795.jpg",
        "accountId": 266664872,
        "img1v1": 109951167404631790,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 7,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 185858,
        "name": "The Weeknd",
        "picUrl": "https://p2.music.126.net/CYjsAAGetnagDZe0LRBrkQ==/109951166903057280.jpg",
        "alias": [],
        "albumSize": 69,
        "picId": 109951166903057280,
        "img1v1Url": "https://p2.music.126.net/03GoNYhDCdIpAdzVWRJVYQ==/109951166902597304.jpg",
        "accountId": 5138893649,
        "img1v1": 109951166902597310,
        "transNames": [
          "威肯"
        ],
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 180,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": "威肯"
      },
      {
        "id": 52010423,
        "name": "CO1",
        "picUrl": "https://p2.music.126.net/jXwsMhxxMuI4xmlhh_2-Sw==/109951167487502849.jpg",
        "alias": [],
        "albumSize": 4,
        "picId": 109951167487502850,
        "img1v1Url": "https://p2.music.126.net/JAcqB7EmFcj5BNBhMVx8Zw==/109951167199056526.jpg",
        "img1v1": 109951167199056530,
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 46757100,
        "name": "A1 TRIP",
        "picUrl": "https://p2.music.126.net/xzBZE5KyUC2Df4sFlqui4Q==/109951165697555403.jpg",
        "alias": [],
        "albumSize": 89,
        "picId": 109951165697555410,
        "img1v1Url": "https://p2.music.126.net/rsbpTht-YnszjMB3bmhvlg==/109951167695171087.jpg",
        "accountId": 309474192,
        "img1v1": 109951167695171090,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 776980,
        "name": "Denzel Curry",
        "picUrl": "https://p2.music.126.net/fkhmT69Dt8ZYjGmh-g_eUg==/109951164119706385.jpg",
        "alias": [],
        "albumSize": 43,
        "picId": 109951164119706380,
        "img1v1Url": "https://p2.music.126.net/oiyxtzWXYkuuDTzoADkn9A==/109951164119710141.jpg",
        "img1v1": 109951164119710140,
        "mvSize": 66,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 3691,
        "name": "刘德华",
        "picUrl": "https://p2.music.126.net/QtLdAChW3mrSoX0TSuGknQ==/109951165564917767.jpg",
        "alias": [
          "Andy Lau",
          "华仔"
        ],
        "albumSize": 127,
        "picId": 109951165564917760,
        "img1v1Url": "https://p2.music.126.net/2O5p7mYW7mYRBUDnPi4DwA==/109951165564919696.jpg",
        "img1v1": 109951165564919700,
        "mvSize": 19,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "Andy Lau",
          "华仔"
        ],
        "trans": null
      },
      {
        "id": 13178450,
        "name": "Kenny Mason",
        "picUrl": "https://p2.music.126.net/7__UfTKiGKp3XoevsFeI6A==/109951164552861900.jpg",
        "alias": [],
        "albumSize": 16,
        "picId": 109951164552861900,
        "img1v1Url": "https://p2.music.126.net/rg-StLeGkiHZyE0FbZVX1w==/109951164552860892.jpg",
        "img1v1": 109951164552860900,
        "mvSize": 31,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 12077204,
        "name": "陈壹千",
        "picUrl": "https://p2.music.126.net/ZSU2mgF43Pv6vsYneprVWw==/109951165818611746.jpg",
        "alias": [
          "Amy Chanrich"
        ],
        "albumSize": 49,
        "picId": 109951165818611740,
        "img1v1Url": "https://p2.music.126.net/sKqXKfPTBi-SL79ThrkbAA==/109951167793722288.jpg",
        "accountId": 102113052,
        "img1v1": 109951167793722290,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "Amy Chanrich"
        ],
        "trans": null
      },
      {
        "id": 881021,
        "name": "GOT7",
        "picUrl": "https://p2.music.126.net/WsQt-7IFvdal8r_VP8pAwg==/109951167394488494.jpg",
        "alias": [],
        "albumSize": 41,
        "picId": 109951167394488500,
        "img1v1Url": "https://p2.music.126.net/D8JMBZ8sajzknUBpvLeJAQ==/109951167394489450.jpg",
        "accountId": 7846432924,
        "img1v1": 109951167394489460,
        "transNames": [
          "갓세븐"
        ],
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 977,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": "갓세븐"
      },
      {
        "id": 12258420,
        "name": "AY楊佬叁",
        "picUrl": "https://p2.music.126.net/772UAYl9gdDiNuayL2AGrQ==/109951164616603545.jpg",
        "alias": [],
        "albumSize": 31,
        "picId": 109951164616603550,
        "img1v1Url": "https://p2.music.126.net/fe-u-rYiwnArfL3-PGtvpg==/109951167095439962.jpg",
        "accountId": 912583,
        "img1v1": 109951167095439970,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 3,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 127601,
        "name": "SECHSKIES",
        "picUrl": "https://p2.music.126.net/UMVxR0UlOF7Wf_S_grWcgg==/109951167699930123.jpg",
        "alias": [
          "水晶男孩"
        ],
        "albumSize": 13,
        "picId": 109951167699930130,
        "img1v1Url": "https://p2.music.126.net/xymx6lCXVuSZeifjuKbpUA==/109951167699920954.jpg",
        "img1v1": 109951167699920960,
        "mvSize": 79,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "水晶男孩"
        ],
        "trans": null
      },
      {
        "id": 31309410,
        "name": "XMASwu（吴骜）",
        "picUrl": "https://p2.music.126.net/lPRzEgNQe2BR-7-nIP_Stw==/109951165691937280.jpg",
        "alias": [],
        "albumSize": 55,
        "picId": 109951165691937280,
        "img1v1Url": "https://p2.music.126.net/TKLkSeVuzQyqJFsDrMU-Lg==/109951167606819073.jpg",
        "accountId": 570389267,
        "img1v1": 109951167606819070,
        "transNames": [
          "吴骜"
        ],
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 5,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": "吴骜"
      },
      {
        "id": 49094303,
        "name": "失眠小孩",
        "picUrl": "https://p2.music.126.net/WN0cMKghFTynQzH55rtgZw==/109951166226648913.jpg",
        "alias": [],
        "albumSize": 1,
        "picId": 109951166226648910,
        "img1v1Url": "https://p2.music.126.net/YZJZ1ENNDHUVnH-ss2tvtg==/109951167798364412.jpg",
        "accountId": 376217455,
        "img1v1": 109951167798364420,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 1203045,
        "name": "艾热 AIR",
        "picUrl": "https://p2.music.126.net/2aCqy2k9cIMzJDd0TU9CMg==/109951164513946258.jpg",
        "alias": [],
        "albumSize": 30,
        "picId": 109951164513946260,
        "img1v1Url": "https://p2.music.126.net/yVb0JTSK7xkps35WOjA40w==/109951166446868250.jpg",
        "accountId": 57784700,
        "img1v1": 109951166446868260,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 12,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 51536188,
        "name": "无罪",
        "picUrl": "https://p2.music.126.net/ANCW5RpwyiZIm2Op8NZ1fw==/109951167443557379.jpg",
        "alias": [],
        "albumSize": 6,
        "picId": 109951167443557380,
        "img1v1Url": "https://p2.music.126.net/gmMmc8-qbro-v-TaHILZJQ==/109951167207400367.jpg",
        "accountId": 247224585,
        "img1v1": 109951167207400370,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 1043338,
        "name": "AURORA",
        "picUrl": "https://p2.music.126.net/5qeH30sHtmzHyjSZ3dYM_w==/109951166956743946.jpg",
        "alias": [],
        "albumSize": 55,
        "picId": 109951166956743950,
        "img1v1Url": "https://p2.music.126.net/nTFRkQ8lYsiGZfHzS0fStg==/109951166956748317.jpg",
        "accountId": 7852323841,
        "img1v1": 109951166956748320,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 121,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 52560499,
        "name": "IA9",
        "picUrl": "https://p2.music.126.net/PDhX_ix-1mx7fcfrTMSyZQ==/109951167387116084.jpg",
        "alias": [],
        "albumSize": 2,
        "picId": 109951167387116080,
        "img1v1Url": "https://p2.music.126.net/htiKV0K7OF1kuO0ulra1Rg==/109951167387113209.jpg",
        "accountId": 1746682675,
        "img1v1": 109951167387113220,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 45236,
        "name": "Avicii",
        "picUrl": "https://p2.music.126.net/VFIh-ZZhVwiXL6h_pxd44A==/109951166128779931.jpg",
        "alias": [],
        "albumSize": 107,
        "picId": 109951166128779940,
        "img1v1Url": "https://p2.music.126.net/HFfIZsij1KsAYYvMY80EzQ==/109951166128791587.jpg",
        "img1v1": 109951166128791580,
        "mvSize": 110,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 36458303,
        "name": "0347",
        "picUrl": "https://p2.music.126.net/UL7c-CtJyw93nP_vNxUeGg==/109951167116968588.jpg",
        "alias": [],
        "albumSize": 28,
        "picId": 109951167116968590,
        "img1v1Url": "https://p2.music.126.net/s-D6yhzhWrP72zVl5BiJ3w==/109951167116396509.jpg",
        "accountId": 3416711434,
        "img1v1": 109951167116396510,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 48161,
        "name": "Ariana Grande",
        "picUrl": "https://p2.music.126.net/Rv6o_7G80HdV0DzXz7qUZg==/109951165611202438.jpg",
        "alias": [],
        "albumSize": 53,
        "picId": 109951165611202430,
        "img1v1Url": "https://p2.music.126.net/zV9rg-isR2Xe9fNORjYSZw==/109951165611212158.jpg",
        "accountId": 3323190547,
        "img1v1": 109951165611212160,
        "transNames": [
          "爱莉安娜·格兰德"
        ],
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 243,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": "爱莉安娜·格兰德"
      },
      {
        "id": 36683569,
        "name": "水泥",
        "picUrl": "https://p2.music.126.net/6t_v9icP48NCDRTUb5vNow==/109951166171441778.jpg",
        "alias": [],
        "albumSize": 8,
        "picId": 109951166171441780,
        "img1v1Url": "https://p2.music.126.net/qz8ZSmw-Omz1JGlUWfLCMw==/109951166899495914.jpg",
        "accountId": 570170681,
        "img1v1": 109951166899495920,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      },
      {
        "id": 10559,
        "name": "张惠妹",
        "picUrl": "https://p2.music.126.net/Fx7QkR-NjqeVDCdS2X73DA==/109951165588542091.jpg",
        "alias": [
          "aMEI",
          "阿妹",
          "阿密特"
        ],
        "albumSize": 42,
        "picId": 109951165588542100,
        "img1v1Url": "https://p2.music.126.net/rCsLFXha6SLis0tV7yZ5fA==/109951165588539704.jpg",
        "accountId": 29879272,
        "img1v1": 109951165588539710,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png",
        "mvSize": 210,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "alia": [
          "aMEI",
          "阿妹",
          "阿密特"
        ],
        "trans": null
      },
      {
        "id": 53705928,
        "name": "黄zhi",
        "picUrl": "https://p2.music.126.net/Zsocsx-XQlbVInpZLQH9Ag==/109951167784407589.jpg",
        "alias": [],
        "albumSize": 1,
        "picId": 109951167784407580,
        "img1v1Url": "https://p2.music.126.net/UfNx7WdVnqFwp49kYJlvOQ==/109951167792807741.jpg",
        "accountId": 381021061,
        "img1v1": 109951167792807740,
        "identityIconUrl": "https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4874132307/4499/f228/d867/da64b9725e125943ad4e14e4c72d0884.png",
        "mvSize": 0,
        "followed": false,
        "alg": "alg_search_precision_artist_tab_basic",
        "trans": null
      }
    ],
    "searchQcReminder": null
  });
  
  let timestamp = 0;
  
  const [,] = useDebounce(() => {
    if (!searchVal) return;
    const now = Date.now();
    timestamp = now;
    setSearching(true);
    // axios({
    //   url: `${import.meta.env.VITE_API_URL}/search?keywords=${searchVal}&type=${selectedType}`,
    //   method: "get",
    // }).then(res=> {
    //   if (timestamp === now && res.status === 200) {
    //     const data = res.data;
    //     if (data.code === 200) {
    //       setResult(data.data);
    //     }
    //   }
    // }).finally(() => {
    //   if (timestamp === now) {
    //     setSearching(false);
    //   }
    // });
    setTimeout(() => {
      setSearching(false);
    }, 20000);
  }, 200, [searchVal, selectedType]);

  return (
    <div className="rm-search">
      <div className={`head rm-transition mx-auto mt-20 flex w-[600px] items-stretch justify-center rounded-xl border
                      border-slate-400 bg-white hover:border-cyan-400 ${searchFocus && "active"}`}>
        <select 
          className="rounded-l-xl px-2 text-sm" title="搜索类型" 
          value={selectedType}
          onChange={({ currentTarget }) => setSearchType(+currentTarget.value)}
        >
          {searchTypeKeys.map(key => (
            <option key={key} value={searchType[key].key}>{searchType[key].label}</option>
          ))}
        </select>
        <input
          className="grow border-l p-2"
          placeholder="搜索..."
          value={searchVal}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          onChange={({ currentTarget }) => {
            setSearchVal(currentTarget.value);
          }}
        />
        <SvgIcon name={searching ? "s-loading" : "search"} className={`mr-3 aspect-square w-4 fill-slate-500 ${searchFocus && "fill-purple-500"}`} />
      </div>
      <div className="body mt-10">
        {selectedType===searchType["singer"].key && (
        <SingerResult loading={searching} empty={!result.artists.length} result={result}/>)}
      </div>
    </div>
  );
}

const SingerResult = ({ loading, empty, result }: {loading: boolean, empty: boolean, result: {
  hasMore: boolean,
  artistCount: number,
  hlWords: string,
  artists: {
    id: number,
    name: string,
    alias: string[],
    albumSize: number,
    img1v1Url: string,
    identityIconUrl: string,
    mvSize: number,
    followed: boolean,
    trans: string
  }[],
}}) => {
  return (
    <RmTable loading={loading} empty={empty} head={["头像", "名称", "又名", "专辑数", "MV数", "账号"]}>      
      <tbody>
        {result.artists.map(item => (
          <tr key={item.id}>
            <td>
              <img className="rounded-full" src={item.img1v1Url+"?param=40y40"} alt="avatar" />
            </td>
            <td>
              <span className="text-sm">{item.name}</span>
            </td>
            <td>
              <span className="text-ellipsis text-xs">{item.alias.join("、")}</span>
            </td>
            <td className="text-xs">{item.albumSize}</td>
            <td className="text-xs">{item.mvSize}</td>
            <td>
              {item.identityIconUrl && 
              <img className="aspect-square w-4" src={item.identityIconUrl} alt="account" />}
            </td>
          </tr>
      ))}
      </tbody>
    </RmTable>
  );
};