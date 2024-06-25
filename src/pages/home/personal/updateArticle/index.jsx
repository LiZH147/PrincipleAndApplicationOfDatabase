import React, { memo, useEffect, useRef } from 'react';
import { Input } from 'antd';
import MyTextArea from '../cpns/myTextArea';

const { TextArea } = Input;

const UpdateArticle = () => {
    const updateArticleRef = useRef();
    useEffect(() => {
        updateArticleRef.current.value = 'dssdsd'
        console.log(updateArticleRef.current.value);
    });
    return <TextArea autoSize ref={updateArticleRef}>dasdasdasd</TextArea>;
};

export default memo(UpdateArticle);
