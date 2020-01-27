import createNoteEpic from "./CreateNoteEpic";
import deleteNoteEpic from "./DeleteNoteEpic";
import updateNoteEpic from "./UpdateNoteEpic";

const epics = [...createNoteEpic, ...updateNoteEpic, ...deleteNoteEpic];

export default epics;
