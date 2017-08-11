export const getmessage = state => state.msg.message;
export const getModal = state => state.modal;
export const getModalConfirm = state => state.modal.confirm;


export const getAuth = state => state.authInfo.token;
export const getUser = state => state.user.data;

export const busList = state => state.busList.list;
export const busPage = state => state.busList.page;
export const busTag = state => state.busTag.list;
export const busInfo = state => state.busDetails.busInfo;
export const busDetList = state => state.busDetails.list;
export const busSampleList = state => state.busSample.list;
export const busSampleStore = state => state.busSample.store;
export const busSamplePage = state => state.busSample.page;
export const busSampleTag = state => state.busSampleTag.list;


export const mealList = state => state.mealList.list;
export const mealPage = state => state.mealList.page;
export const mealTag = state => state.mealTag.list;
export const mealInfo = state => state.mealDetails.info;
export const mealDetails = state => state.mealDetails.detail;
export const thisMealList = state => state.thisMealList.list;
export const thisMealStore = state => state.thisMealList.store;
export const thisMealTag = state => state.thisMealTag.list;

export const camaraman = state => state.camaraman.camaraman;
export const camaramanBusinfo = state => state.camaraman.bus_info;
export const camaramanPackages = state => state.camaraman.packages;

export const makeupman = state => state.makeupman.makeup;
export const makeupmanBusinfo = state => state.makeupman.bus_info;
export const makeupmanPackages = state => state.makeupman.packages;

export const getIndexPhoto = state => state.index;
export const getViewPhoto = state => state.viewPhoto.list;
export const getViewPhotoInfo = state => state.viewPhoto.photoInfo;
export const getPhotoList = state => state.viewPhoto.photoList;
export const getPhotoStatus = state => state.viewPhoto.status;

export const getGuideList = state => state.guide.list;

export const getCollectList = state => state.collect.list;
export const getCollectUserInfo = state => state.collect.user;

