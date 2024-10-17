import React, { useState, useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import {Link} from "react-router-dom";
import axios from "axios";

function Survey() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({
    step0: '',
    step1: '',
    step2: '',
    step3: ''
  }); // 각 스텝의 입력 값을 저장할 상태
  const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태
  const inputRef = useRef(null);
  const steps = ['brandName', 'brandNameMean', 'business', 'vibe', 'selectImage'];

  const handleNext = () => {

      // 현재 스텝의 입력값이 비어있는지 확인
      if (activeStep < 4 && !formValues[`step${activeStep}`].trim()) {
          if (inputRef.current) {
              inputRef.current.focus();
          }
          setErrorMessage('내용을 입력 해주세요.'); // 경고 메시지 표시
          return; // 빈 입력값이 있으면 다음 스텝으로 넘어가지 않음
      } else {
          setErrorMessage('');
      }

      if(activeStep == 4) {
          console.log(formValues);
      }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrorMessage('');
  };

  useEffect(() => {
    // activeStep이 변경될 때마다 실행, input 요소에 포커스 설정
    if (inputRef.current) {
        inputRef.current.focus();
    }
  }, [activeStep]); // activeStep이 변경될 때마다 실행

  // 입력 값이 변경될 때 상태 업데이트
  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [`step${activeStep}`]: e.target.value
    });
  };

    const baseUrl = "http://localhost:8080";

    const [ data, setData ] = useState();

    useEffect(() => {
        putSpringData();
    },[])

    async function putSpringData() {
        await axios
            .get(baseUrl + "/exampleImage")
            .then((res)=>{
                console.log(res.data);
                setData(res.data);
            })
            .catch((err)=>{
                console.log(err);
            })
    }

  const renderStep = () => {
    let content = null;
    switch (activeStep) {
        case 0:
            content = (
                <div className="p-lr-8">
                    <div className="title-div m-b-0">브랜드명</div>
                    <span className="description-span">CI /BI 에 적용될 브랜드명 또는 서비스명을 입력해주세요.</span>
                    <input type="text"
                           ref={inputRef}
                           value={formValues.step0} // 상태에 저장된 값
                           onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                           name="brandName" className="common-input" placeholder="예시) Brand Logo Lab"/>
                </div>
            );
            break;
        case 1:
            content = (
                <div className="p-lr-8">
                    <div className="title-div m-b-0">브랜드명 의미</div>
                    <span className="description-span">브랜드명 또는 서비스명의 의미를 입력해주세요.</span>
                    <input type="text"
                           ref={inputRef}
                           value={formValues.step1} // 상태에 저장된 값
                           onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                           name="brandNameMean" className="common-input" placeholder="예시) Brand Logo를 만드는 연구실(Lab)"/>
                </div>
            );
            break;
        case 2:
            content = (
                <div className="p-lr-8">
                    <div className="title-div m-b-0">비즈니스</div>
                    <span className="description-span">비즈니스에 대한 상세한 설명을 작성해주세요.</span>
                    <textarea ref={inputRef}
                              value={formValues.step2} // 상태에 저장된 값
                              onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                              name="business" className="common-text" rows="3" placeholder="예시) 브랜드 로고, 서비스 로고를 생성형 AI를 통해 빠르고 정확한, 감각의 디자인을 개발합니다.">
          </textarea>
                </div>
            );
            break;
        case 3:
            content = (
                <div className="p-lr-8">
                    <div className="title-div m-b-0">로고 분위기</div>
                    <span className="description-span">원하는 분위기부터 담고 싶은 이미지, 강조하고 싶은 주제 등 상세히 작성해주세요.</span>
                    <textarea ref={inputRef}
                              value={formValues.step3} // 상태에 저장된 값
                              onChange={handleInputChange} // 값이 변경될 때 상태 업데이트
                              name="vibe" className="common-text" rows="3" placeholder="예시) 클래식한, 심플한, 개성있는, 집, 나무, 자연의 이미지 등">
          </textarea>
                </div>
            );
            break;
        case 4:
            content = (
                <div className="p-lr-8">
                    <div className="description-span">원하는 스타일을 선택해주세요!</div>
                    <Stack direction="row">
                        <img src={data[0].image_url} />
                        <img src={data[0].image_url} />
                        <img src={data[0].image_url} />
                        <img src={data[0].image_url} />
                    </Stack>
                </div>
            );
            break;
        default:
            content = <div>Error</div>;
            break;
    }
    return content;
  };

  return (
      <div className="survey text-center">
          <div className="progress-div">
              <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                      return (
                          <Step key={label}>
                              <StepLabel></StepLabel>
                          </Step>
                      );
                  })}
              </Stepper>
          </div>
          <div className="content-div text-left">
              {activeStep === steps.length ? (
                  <React.Fragment>
                      생성중이에요, 잠시만 기다려주세요 !
                  </React.Fragment>
              ) : (
                  <React.Fragment>
                      <div sx={{ mt: 2, mb: 1 }}>{renderStep()}</div>
                      <div style={{ height: '24px' }}>{errorMessage && <Typography sx={{ ml: 2 }} color="error">{errorMessage}</Typography>}</div>
                  </React.Fragment>
              )}
          </div>
          <div className="button-div">
              {activeStep < steps.length && (
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                      {activeStep > 0 && (
                          <Button
                              className="common-button back-button" variant="contained"
                              disabled={activeStep === 0}
                              onClick={handleBack}
                              sx={{ mr: 1 }}
                              >
                              BACK
                          </Button>
                      )}
                      <Box sx={{ flex: '1 1 auto' }} />
                      <Button className="common-button f-right" variant="contained" color="pupleblue" onClick={handleNext}>
                          {activeStep === steps.length - 1 ? 'FINISH' : 'NEXT'}
                      </Button>
                  </Box>
              )}
          </div>
      </div>
  );
}

export default Survey;