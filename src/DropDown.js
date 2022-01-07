import Form from 'react-bootstrap/Form';

const DropDown = props => {
  const { data, onChange, placeholder, name, value } = props;
  return (
    <Form.Select aria-label="Default select example" onChange={onChange} name={name} value={value}>
      <option>{placeholder || 'Select an option'}</option>
      {data.map(item => <option key={item.id.toString()} value={item.id}>{item.name}</option>)}
    </Form.Select>
  )
}

export default DropDown;