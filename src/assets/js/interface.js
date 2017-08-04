/**
 * Created by Administrator on 2017/7/24.
 */
let host = 'http://120.24.178.171:8080' //192.168.0.36   ,  http://112.74.136.96
export default{
  getList : host+'/school/courseinfoManage_listPublishSecondCourseinfo.do?method=getSecondCourseList',
  getMyList : host+'/school/courseinfoManage_listPublishSecondCourseinfo.do?method=getMyRegist',
  applyUrl : host+'/school/courseinfoManage_listPublishSecondCourseinfo.do?method=registrationSecondCourse',
  cancelApply : host+'/school/courseinfoManage_listPublishSecondCourseinfo.do?method=cancelRegistrationSecondCourse',
  getDetail : host+'/school/courseinfoManage_listPublishSecondCourseinfo.do?method=getSecondCourserinfo',
  getStudentList:host+'/school/courseinfoManage_listPublishSecondCourseinfo.do?method=getStudent',
  getUserRole:host+'/school/courseinfoManage_listPublishSecondCourseinfo.do?method=getRoleType'
}
