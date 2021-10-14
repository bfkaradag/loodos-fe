import React, {useState} from 'react';
import {UserAddOutlined, PlusOutlined} from '@ant-design/icons';
import MisafirEkle from './MisafirEkle';
import {createMeeting, checkMeeting} from '../../services/meetingService';
import {Input, Select, Button, DatePicker, Popover} from 'antd';
const { Option } = Select;

const RandevuEkle = (props) => {
    const [guest, setGuest] = useState();
    const [date, setDate] = useState();
    const [title, setTitle] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }
    const handleGuestChange = (id) => {
        setGuest(id);
    }
    const handleDateChange = (date,dateString) => {
        setDate(dateString);
    }
    const cleanStates = () => {
        setTitle("");
        setGuest("");
        setDate("");
    }
    const buttonDisable = guest && date && title;
    const requestCreateMeet = async () => {
        const data = {
            guest: guest,
            title: title,
            date: date
        }
        const check = await checkMeeting({date: date});
        if(check.data.length == 0){
            const response = await createMeeting(data);
            if(response.status == 201) {
                alert("Randevu başarı ile oluşturuldu.");
                window.location.reload();
            }
        }
        else alert("Bu tarihte bir randevunuz var!")
    }

    return(
        <div className="d-flex flex-column">
            <div className="mt-2">
                <Input value={title} onChange = {handleTitleChange} placeholder="Randevu başlığı" />
            </div>
            <div className="mt-2 d-flex flex-row">
                <Select value = {guest} onChange = {handleGuestChange} className="w-100" placeholder="Randevu konuğunu seçiniz">
                    {
                        props.guests.map(guest => {
                            return <Option key={guest.id} value={guest.id}>{guest.firstName} {guest.lastName}</Option>
                        })
                    }
                </Select>
                <Popover content={<MisafirEkle />} title="Misafir Ekle" trigger="click">
                    <Button className="ms-2" type="primary" icon={<UserAddOutlined />} size="middle" />
                </Popover>
            </div>            
            <div className="mt-2">
                <DatePicker showTime={{ format: 'HH:mm' }} format="DD-MM-YYYY HH:mm" placeholder="Tarih seçin" className="w-100" onChange = {handleDateChange} />
            </div>
            <div className="mt-2 d-flex justify-content-end">
                <Button 
                disabled = {!buttonDisable}
                onClick = {requestCreateMeet} 
                type="primary" 
                size="large"
                
                >
                    Randevu Oluştur
                </Button>
            </div>
            
        </div>
    )
}

export default RandevuEkle;