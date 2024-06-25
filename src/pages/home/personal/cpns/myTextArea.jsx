import React, { memo } from 'react';
import { Input, Avatar, Card } from 'antd';

const { TextArea } = Input;
const { Meta } = Card;

const MyTextArea = () => {
    return (
        <Card
            style={{
                width: 300
            }}
            cover={<TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />}
            actions={[]}
        >
            <Meta
                avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                title="Card title"
                description="This is the description"
            />
        </Card>
    );
};

export default memo(MyTextArea);
