import getCustomerEpic from "./GetCustomerEpic";
import listCustomerEpic from "./ListCustomerEpic";
import updateCustomerEpic from "./UpdateCustomerEpic";

const epics = [...listCustomerEpic, ...getCustomerEpic, ...updateCustomerEpic];

export default epics;
