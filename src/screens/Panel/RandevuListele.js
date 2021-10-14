import React, {useState, useEffect} from 'react';
import {authCheck} from '../../services/authService';
import {getMeetings} from '../../services/meetingService';
import {Table} from 'antd';
import moment from 'moment';

const RandevuListele = (props) => {
    const [meetings, setMeetings] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState();
    const [sortedInfo, setSortedInfo] = useState();


    useEffect(async() => {
        const check = await authCheck({sessionKey: localStorage.getItem("sessionKey")});
        const response = await getMeetings({userId:check.data[0].id});
        response.data.map(res => {
            let guest = props.guests.find(guest => guest.id === res.guest);
            res.guestName = guest.firstName + " " + guest.lastName;
        });
        setMeetings(response.data);
    }, [])
    const onChange = (pagination, filters, sorter, extra) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    }

    let tableguests = 
        meetings.map(m => {
            return ({
                value: m.guest,
                text: m.guestName
            })
        });
    const filteredguests = tableguests.filter((item, i) => tableguests.indexOf(item) == i);
    const columns = [
        {
            title: 'Başlık',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Misafir',
            dataIndex: 'guestName',
            key: 'guest',
            filters: filteredguests,
            filteredValue: filteredInfo?.guest || null,
            onFilter: (value, record) => record.guest === value,
            ellipsis: true,
        },
        {
            title: 'Tarih',
            dataIndex: 'date',
            key: 'date',
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
            sortOrder: sortedInfo?.columnKey == "date" && sortedInfo?.order,
            ellipsis: true,

        },
        
      ];
    return(
        <div style={{maxWidth:600}}>
            <Table columns={columns} onChange={onChange} dataSource = {meetings} />
        </div>
    )
}
// columns={columns} dataSource={data}
export default RandevuListele;