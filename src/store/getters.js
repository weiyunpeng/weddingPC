export const getmessage = state => state.msg.message;
export const getModal = state => state.modal;
export const getModalConfirm = state => state.modal.confirm;


export const getAuth = state => state.authInfo.token;
export const getUser = state => state.user.data;

export const shopList = state => state.shopStore.list;
export const shopPage = state => state.shopStore.page;
export const busTag = state => state.shopStoreTag.list;
export const shopInfo = state => state.shopStore.shopInfo;
export const shopDetails = state => state.shopStore.shopDetails;
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

export const camaraman = state => state.camaraman.cameraman;
export const camaramanBusinfo = state => state.camaraman.bus_info;
export const camaramanPackages = state => state.camaraman.packages;

export const makeupman = state => state.makeupman.makeup;
export const makeupmanBusinfo = state => state.makeupman.bus_info;
export const makeupmanPackages = state => state.makeupman.packages;

export const getIndexPhoto = state => state.index.list;
export const getViewPhoto = state => state.viewPhoto.list;
export const getViewThumb = state => state.viewPhoto.stumb;
export const getViewPhotoInfo = state => state.viewPhoto.photoInfo;
export const getViewPhotoStatus = state => state.viewPhoto.photoModelStatus;
export const getPhotoList = state => state.viewPhoto.photoList;
export const getPhotoListFill = state => state.viewPhoto.photoListFill;
export const getPhotoStatus = state => state.viewPhoto.status;
export const getCommentList = state => state.comment.list;
export const getCommentPage = state => state.comment.page;


export const getGuideList = state => state.guide.list;

export const getCollectList = state => state.collect.list;
export const getCollectUserInfo = state => state.collect.user;

