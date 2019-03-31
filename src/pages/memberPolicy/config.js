import {
  Input,
  Button,
  Select,
  Option,
  DatePicker,
  Checkbox,
} from 'element-ui'

export default {
  install(V) {
    V.use(Input)
    V.use(Button)
    V.use(Select)
    V.use(Option)
    V.use(DatePicker)
    V.use(Checkbox)
  }
}