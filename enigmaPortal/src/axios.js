// axios
import axios from 'axios'

const baseURL = 'https://backend.medicodesolution.com/development';

export default axios.create({
  baseURL
  // You can add your headers here
})
