import api from '@/api';

interface ApiPayload {
  [key: string]: any;
}

interface AttendancePayload extends ApiPayload {
  student_id?: string;
  date?: string;
}

interface SchedulePayload extends ApiPayload {
  class_id?: string;
  section_id?: string;
}

interface ExamPayload extends ApiPayload {
  student_id?: string;
  exam_id?: string;
}

interface FeesPayload extends ApiPayload {
  student_id?: string;
}

interface StudentPayload extends ApiPayload {
  class_id?: string;
  section_id?: string;
}

interface MeetingPayload extends ApiPayload {
  staff_id?: string;
  parent_id?: string;
  meeting_id?: string;
  status?: string;
  time?: string;
}

export const getStudentAttendance = (payload: AttendancePayload) => {
  return api('webservice/getAttendenceRecords', payload, 'post');
};

export const getClassSchedule = (payload: SchedulePayload) => {
  return api('webservice/class_schedule', payload, 'post');
};

export const getMySchedule = (id: string) => {
  return api(`staff/mytimetable?teacher_id=${id}`, null, 'post');
};

export const getNoticeBoard = (payload: ApiPayload) => {
  return api('webservice/getNotifications', payload, 'post');
};

export const getExamsList = (payload: ExamPayload) => {
  return api('webservice/getExamList', payload, 'post');
};

export const getExamSchedule = (payload: ExamPayload) => {
  return api('webservice/getExamSchedule', payload, 'post');
};

export const fetchStudentFees = (payload: FeesPayload) => {
  return api('webservice/fees', payload, 'post');
};

export const getStudentByClassId = (payload: StudentPayload) => {
  return api('webservice/getStudentsByClassSectionID', payload, 'post');
};

export const markAttendence = (payload: AttendancePayload) => {
  return api('staff/markAttendance', payload, 'post');
};

export const getAttendenceByDate = (payload: AttendancePayload) => {
  return api('staff/getAttendenceByDate', payload, 'post');
};

export const getStudentProfile = (payload: ApiPayload) => {
  return api('webservice/getStudentProfile', payload, 'post');
};

export const getStaffList = (payload: ApiPayload) => {
  return api('webservice/getParentStaffList', payload, 'post');
};

export const sendMeetingRequest = (payload: MeetingPayload) => {
  return api('webservice/sendMeetingRequest', payload, 'post');
};

export const updateMeetingRequest = (payload: MeetingPayload) => {
  return api('webservice/sendMeetingRequest', payload, 'post');
};

export const updateMeetingTime = (payload: MeetingPayload) => {
  return api('webservice/updateMeetingTime', payload, 'post');
};

export const updateMeetingStatus = (payload: MeetingPayload) => {
  return api('webservice/acceptOrDeclinedMeeting', payload, 'post');
};

export const getMeetingList = (payload: MeetingPayload) => {
  return api('webservice/getStaffMeetingList', payload, 'post');
};

export const getNotifications = () => {
  return api('webservice/getInsertNotifications', null, 'get');
};

export const getHomeSliderImage = () => {
  return api('webservice/getSliderImages', null, 'get');
};

export const getBranchList = () => {
  return api('webservice/getBranchList', null, 'get');
};

export const getBranchDetails = (branchCode: string) => {
  return api(
    `webservice/getBranchDetails?branch_code=${branchCode}`,
    null,
    'get',
  );
};

export const downloadHomeWork = (branchCode: string) => {
  return api(
    `webservice/getBranchDetails?branch_code=${branchCode}`,
    null,
    'get',
  );
};
