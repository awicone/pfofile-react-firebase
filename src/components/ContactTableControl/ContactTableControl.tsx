import React from 'react'
import s from './ContactTableControl.module.scss'
import { Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons';

interface ContactTableControlProps {
  onSearch: (searchValue: string) => void,
  onAddUserButtonClick: () => void,
  className?: string,
}

function ContactTableControl({ onSearch, onAddUserButtonClick }: ContactTableControlProps) {
  return (
    <div className={s.controlContainer}>
      <Input className={s.searchInput}
        onChange={(e) => onSearch(e.target.value)}
        type={'text'}
        placeholder={'Find the person by name or phone number'} />
      <Button className={s.addContactButton}
        type="primary"
        onClick={onAddUserButtonClick}
        shape="circle"
        icon={<PlusOutlined />}
        size={'large'} />
    </div>
  )
}

export default ContactTableControl
