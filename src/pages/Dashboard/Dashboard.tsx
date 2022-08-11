import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, message, Modal, Popconfirm, Table, Typography } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import s from './Dashboard.module.scss'
import ContactTableControl from '@/components/ContactTableControl/ContactTableControl'
import AddContactModal from '@/components/AddContactModal/AddContactModal'
import { Contact } from '@/types/Contact'

const originData: Contact[] = [];
for (let i = 0; i < 5; i++) {
  originData.push({
    id: i,
    name: `Test user ${i}`,
    address: `Moscow city ${i}`,
    phone: 88005553535,
    key: i,
  });
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Contact;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Dashboard: React.FC = () => {
  const [form] = Form.useForm();
  const [viewData, setViewData] = useState(originData);
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState(-1);
  const [isAddContactModalVisible, setIsAddContactModalVisible] = useState(false);
  const { confirm } = Modal;

  const deleteWithConfirm = (contactId: number) => {
    confirm({
      title: 'Do you want to delete these contact?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone',
      onOk() {
        handleDelete(contactId)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelete = (contactId: number) => {
    setData(data => data.filter(contact => contact.id !== contactId));
    setViewData(cachedData => cachedData.filter(contact => contact.id !== contactId));
    message.success('Contact was deleted successfully!', 3)
  };

  const addContactHandler = (contact: Contact) => {
    setViewData(cachedData => [...cachedData, contact])
    setData(cachedData => [...cachedData, contact])
    message.success('Contact was created successfully!', 3)
    setIsAddContactModalVisible(false)
  }

  const searchHandler = (searchValue: string) => {
    if (searchValue === '') {
      setViewData(data)
    } else {
      setViewData(data.filter((contact) =>
        contact.name?.toLowerCase().includes(searchValue)
        || String(contact.phone)?.toLowerCase().includes(searchValue)))
    }
  }

  const isEditing = (record: Contact) => record.key === editingKey;

  const edit = (record: Partial<Contact> & { key: React.Key }) => {
    form.setFieldsValue({ name: '', address: '', phone: '', ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey(-1);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Contact;

      const newData = [...viewData];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setViewData(newData);
        setEditingKey(-1);
      } else {
        newData.push(row);
        setViewData(newData);
        setEditingKey(-1);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: '25%',
      editable: true,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '15%',
      editable: true,
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Contact & { key: React.Key }) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <div className={s.controlCell}>
            <Typography.Link disabled={editingKey !== -1} onClick={() => edit(record)}>
              Edit
            </Typography.Link>
            <Button className={s.removeButton} danger
              type={'primary'}
              disabled={editingKey !== -1}
              onClick={() => deleteWithConfirm(record.id)}>
              Remove
            </Button>
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Contact) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className={s.dashboardContainer}>
      <h1 className={s.projectTitle}>My Address Book 📓</h1>
      <AddContactModal onOk={(contact: Contact) => addContactHandler(contact)}
        contactsData={viewData}
        onCancel={() => setIsAddContactModalVisible(false)}
        isVisible={isAddContactModalVisible} />
      <Form form={form} component={false}>
        <ContactTableControl onSearch={(searchValue) => searchHandler(searchValue)}
          onAddUserButtonClick={() => setIsAddContactModalVisible(true)} />
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={viewData}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
};

export default Dashboard


