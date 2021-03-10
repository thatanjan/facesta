import {AnyObject} from "interfaces/global"

const checkEmptyObject = (obj: AnyObject) => obj && Object.keys(obj).length === 0 && obj.constructor === Object


export default checkEmptyObject
