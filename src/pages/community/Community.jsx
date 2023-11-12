import React, { useEffect, useState } from "react";
import * as S from "./style";
import * as AIS from "../ai/style";
import Banner from "../../components/common/banner/Banner";
import axios from "../../api/axios";

import { Card } from "../../components/card/detail_card";

function Community() {
  // 탭 기능 구현
  const [currentTab, setCurrentTab] = useState(0);
  const [data, setData] = useState([]);

  const selectMenuHandler = index => {
    setCurrentTab(index);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('/reports');
      /*{
        "name": "이상민",
        "case_num": "20230001",
        "title": "경북대 김재일 교수님을 신고합니다.",
        "content": "쪽지시험 날에 결석하셨습니다.",
        "is_case_close": false,
        "school_name": "경북대학교",
        "chains": [
            {
                "wallet_name": "[사건번호/20230001]",
                "progress_status": "REPORT_SUBMITTED",
                "address": "0x2021deb33721e5f6082cd67b0a836f2e35730f31"
            },
            {
                "wallet_name": "신고 접수 확인 중",
                "progress_status": "REPORT_SUBMITTED",
                "address": "0x9b737de03a96ad3f3d4146bc329983c71a162098"
            }
        ],
        "agree_names": []
    }*/
      if (response.status === 200) {
        // console.log(response.data.response);
        // console.log(response.data.response.chains[response.data.response.length-1]);
        // const progress_gage = 0;
        // switch(response.data.response.chains[response.data.response.length-1].progress_status) {
        //     case REPORT_SUBMITTED:
        //       progress = 0.2;
        //       break;
        //     case CASE_UNDER_REVIEW:
        //       progress = 0.4;
        //       break;
        //     case REVIEW_RESULT_REPORTED:
        //       progress = 0.6;
        //       break;
        //     case FINAL_JUDGMENT:
        //       progress = 0.8;
        //       break;
        //     case CASE_CLOSED:
        //       progress = 1;
        //       break;
        // }

        // console.log(progress_gage);
        
        setData(response.data.response.map(item => ({
          name: item.name,
          case_num: item.case_num,
          title: item.title,
          content: item.content,
          is_case_close: item.is_case_close,
          school_name: item.school_name,
          // progress: progress_gage,      
        })));
        
        console.log(data);
        
      }

      // if (response.data && Array.isArray(response.data)) {
      //   setData(response.data.map(item => ({
      //     name: item.name,
      //     id: item.id,
      //     title: item.title,
      //     content: item.content,
      //     is_case_close: item.is_case_close,
      //     school_name: item.school_name,        
      //   })));
      //   setInit(true);
      // }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <S.CommunityWrapper>
      <Banner
        titleKorean="사건 상세"
        titleEnglish="DETAIL"
        image={<S.CommunityIconImg />}
      />

 <Card.Container> 
        {data.map((value, index) => {
          return (
            <React.Fragment key={index}>
              <Card.Item
                title={value.title}
                category={value.category}
                subcategory={value.subcategory}
                region={value.region}
                quantity={value.quantity}
                time={value.time}
                progress={value.progress}
                onClick={() => handleCardClick(value.id)}
              />
            </React.Fragment>
          );
        })}
      </Card.Container>
    </S.CommunityWrapper>
  );
}

export default Community;