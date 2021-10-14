import React, {useState, useEffect} from 'react';
import {UserAddOutlined} from '@ant-design/icons';
import MisafirEkle from './MisafirEkle';
import {authCheck} from '../../services/authService';
import {getMeetings, checkMeeting, getMeeting, updateMeeting} from '../../services/meetingService';
import {Input, Select, Button, DatePicker, Popover} from 'antd';
import moment from 'moment';
const { Option } = Select;

const RandevuGuncelle = (props) => {
    const [meeting, setMeeting] = useState();
    const [guest, setGuest] = useState();
    const [baseDate, setBaseDate] = useState();
    const [date, setDate] = useState();
    const [title, setTitle] = useState("");
    const [meetings, setMeetings] = useState([]);

    const handleMeetingChange = (id) => {
        setMeeting(id);
    }
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
    const requestUpdateMeeting = async () => {
        const data = {
            guest: guest,
            title: title,
            date: date
        }
        const check = await checkMeeting({date: date});

        if(check.data.length == 0 || date == baseDate){
            var response = await updateMeeting({body: data, id: meeting});
            if(response.status == 200) {
                alert("Randevu başarı ile güncellendi.");
                window.location.reload();
            }
        }
        else alert("Bu tarihte bir randevunuz var!")
        
    }
    useEffect(async() => {      
        if(meeting){
            const response = await getMeeting({id: meeting});
            const data = response.data[0];
            setTitle(data.title);
            setGuest(data.guest);
            setDate(data.date);
            setBaseDate(data.date);
        }
    }, [meeting]);

    useEffect(async() => {
        const check = await authCheck({sessionKey: localStorage.getItem("sessionKey")});
        const response = await getMeetings({userId:check.data[0].id});
        setMeetings(response.data);
    }, [])
    return(
        <div className="d-flex flex-column">
            <div className="mt-2">
                {
                    meetings.length > 0 
                    ?
                    <Select value = {meeting} onChange = {handleMeetingChange} className="w-100" placeholder="Randevuyu seçiniz">
                    {
                        meetings.map(meeting => {
                            return <Option key={meeting.id} value={meeting.id}>{meeting.title} {meeting.date}</Option>
                        })
                    }
                    </Select>
                    :
                    null
                }
            </div>
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
                <DatePicker 
                    value = {date ? moment(date, "DD-MM-YYYY HH:mm"): null}
                    showTime={{ format: 'HH:mm' }} 
                    format="DD-MM-YYYY HH:mm" placeholder="Tarih seçin" className="w-100" onChange = {handleDateChange} />
            </div>
            <div className="mt-2 d-flex justify-content-end">
                <Button 
                disabled = {!meeting}
                onClick = {requestUpdateMeeting} 
                type="primary" 
                size="large">
                    Randevu Güncelle
                </Button>
            </div>
            
        </div>
    )
}

export default RandevuGuncelle;