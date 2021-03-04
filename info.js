/* eslint-disable import/extensions */
/* eslint-disable operator-assignment */
/* eslint-disable no-extend-native */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { getYMD } from './utilities.js';

const url = 'https://challenge.thef2e.com/api/thef2e2019/stage6/room';
const tokenNum = '3LbQ5Nnm3c8nwffY9dBJnV4EdS6wIamHY5TpSDNC0KO3k41xOwll7fAGmexL';

const getParameter = new URL(location.href);
const roomID = getParameter.searchParams.get('roomID');
const roomApi = `${url}/${roomID}`;
const infoDetail = document.querySelector('.info_detail');
const infoDateConfirmInfo = document.querySelector('.info_date_confirmInfo');
let roomData = {};
let pickDateArr = new Set();
let roomBookingStatus = {};
let api = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
let disableDaysArray = [getYMD(new Date())];

// 刪除
const deleteAll = (e) => {
  e.preventDefault();
  axios.defaults.headers.common.Authorization = `Bearer ${tokenNum}`;
  axios.delete(`${api}`).then((res) => {
    console.log('del', res);
  });
};

// post資料
const postData = () => {
  let booking = {
    name: '',
    tel: '',
    date: [],
  };
  const inputName = document.getElementById('inputName');
  const inputPhone = document.getElementById('inputPhone');
  booking.name = inputName.value;
  booking.tel = inputPhone.value;
  booking.date = [...pickDateArr];
  axios.defaults.headers.common.Authorization = `Bearer ${tokenNum}`;
  axios.post(roomApi, booking).then(() => {
    pickDateArr = new Set();
    swal({
      title: '預約成功',
      icon: 'success',
    });
  });
};

// 日曆
const getDays = (startDay, endDay) => {
  let alreadyPickedDateArr = [];
  let sD = startDay;
  let eD = endDay;
  while (sD.getTime() !== eD.getTime()) {
    pickDateArr.add(getYMD(startDay));
    sD = new Date(sD.getFullYear(), sD.getMonth(), sD.getDate() + 1);
  }
  pickDateArr.add(getYMD(endDay));
  roomBookingStatus.forEach((i) => {
    alreadyPickedDateArr.push(i.date);
  });
};

const getOrderDay = (y) => {
  y.forEach((i) => {
    disableDaysArray.push(i.date);
  });
  return disableDaysArray;
};

const pickDate = () => {
  myID.flatpickr({
    mode: 'range',
    minDate: 'today',
    maxDate: new Date().fp_incr(90),
    dateFormat: 'Y-m-d',
    disable: disableDaysArray,
    onChange: ([start, end]) => {
      if (start && end) {
        pickDateArr = new Set();
        getDays(start, end);
      }
    },
  });
};
const clearInputInfo = () => {
  inputName.value = '';
  inputPhone.value = '';
  myID.value = '';
};
// 檢查並傳資料
function checkInfo(e) {
  e.preventDefault();
  if (inputName.value === '') {
    swal({
      title: '請填寫姓名',
      icon: 'warning',
    });
  } else if (inputPhone.value === '') {
    swal({
      title: '請填寫電話',
      icon: 'warning',
    });
  } else if (myID.value === '') {
    swal({
      title: '請選擇入住日期',
      icon: 'warning',
    });
  } else {
    swal({
      title: '您確定要預約？',
      icon: 'warning',
      buttons: true,
    }).then((res) => {
      if (res) {
        calPrice();
        postData();
        clearInputInfo();
      }
    });
  }
}

// 房間資料＋圖片
const render = (data) => {
  // DOM
  const infoHeader = document.querySelector('.info_header');

  const infoDateContent = document.querySelector('.info_date_content');
  const infoDateConfirmBtn = document.querySelector('.info_date_confirmBtn');

  // 渲染字串
  const hStr = `<div class="info_header_bgc-big"
      style="background-image: 
       url(${data.imageUrl[0]});">
    </div>
    <div>
      <div
        style="background-image: url(${data.imageUrl[1]});"
        class="info_header_bgc-small">
      </div>
      <div
        style="background-image:url(${data.imageUrl[2]});"
        class="info_header_bgc-small">
      </div>
    </div>`;

  const str = `<div class="info_detail_content">
    <h1>${data.name}<a href="./index_2.html">Back To Home</a></h1>
    
    <div class="info_detail_content_infos">
      <p>房客人數限制：${data.descriptionShort.GuestMin} - ${data.descriptionShort.GuestMax}</p>
      <p>床型：${data.descriptionShort.Bed[0]}</p>
      <p>浴室數量：${data.descriptionShort['Private-Bath']}</p>
      <p>房間大小：${data.descriptionShort.Footage} 坪</p>
    </div>
    <p>${data.description}</p>
    <div class="info_detail_content_time">
      <div class="info_detail_content_time_title">
        <span>Check in</span>
        <span>Check out</span>
      </div>
      <div class="info_detail_content_time_time">
        <span>${data.checkInAndOut.checkInEarly} - ${data.checkInAndOut.checkInLate}</span>
        <span>${data.checkInAndOut.checkOut}</span>
      </div>
    </div>
    <div class="info_detail_content_support">
      <ul>
        <li class="changeOpacity"><i class="fas fa-wifi"></i><span>Wi-Fi</span></li>
        <li class="changeOpacity"><i class="fas fa-phone"></i><span>電話</span></li>
        <li class="changeOpacity"><i class="fas fa-mountain"></i><span>漂亮的風景</span></li>
        <li class="changeOpacity"><i class="fas fa-utensils"></i><span>早餐</span></li>
        <li class="changeOpacity"><i class="fas fa-wind"></i><span>空調</span></li>
        <li class="changeOpacity"><i class="fas fa-smoking-ban"></i><span>禁止吸煙</span></li>
        <li class="changeOpacity"><i class="fas fa-cocktail"></i><span>Mini Bar</span></li>
        <li class="changeOpacity"><i class="fab fa-xbox"></i><span>冰箱</span></li>
        <li class="changeOpacity"><i class="fas fa-baby"></i><span>適合嬰兒</span></li>
        <li class="changeOpacity"><i class="fas fa-concierge-bell"></i><span>Room Service</span></li>
        <li class="changeOpacity"><i class="fas fa-couch"></i><span>沙發</span></li>
        <li class="changeOpacity"><i class="fas fa-cat"></i><span>寵物攜帶</span></li>
      </ul>
    </div>
  </div>
  <div class="info_detail_price">
    <p class="info_detail_price_normal">NT.${data.normalDayPrice}</p>
    <p class="info_detail_price_detail">平日(一~四)</p>
    <p class="info_detail_price_holiday">NT.${data.holidayPrice}</p>
    <p class="info_detail_price_detail">假日(五~日)</p>
  </div>`;

  const chkStr = `<input type="text" name="" id="inputName" placeholder="Name">
        <input type="phone" name="" id="inputPhone" placeholder="Phone">
        <input id="myID" placeholder="請選擇入住時間">`;

  const btnStr = `<a href="" id="send">確定送出</a>
        <a href="" id="cancel">清除預約</a>`;

  infoHeader.innerHTML = hStr;
  infoDetail.innerHTML = str;
  infoDateContent.innerHTML = chkStr;
  infoDateConfirmBtn.innerHTML = btnStr;
  pickDate();
  // const myID = document.getElementById('myID');
  let send = document.getElementById('send');
  let cancel = document.getElementById('cancel');
  send.addEventListener('click', checkInfo);
  cancel.addEventListener('click', deleteAll);
};

// 算價錢
const calPrice = () => {
  // 將選取的日期陣列（文字），轉換成星期幾～星期幾的陣列（日期）
  let chkDay = [];
  pickDateArr.forEach((i) => {
    const changeToDate = new Date(i);
    const weekDays = changeToDate.getDay();
    chkDay.push(weekDays);
  });

  // 篩選陣列（日期）中的假日的天數和平日的天數
  const holidayNum = chkDay.filter((item) => {
    return item === 5 || item === 6 || item === 0;
  });
  const normalDayNum = chkDay.filter((item) => {
    return item !== 5 && item !== 6 && item !== 0;
  });

  const normalDayPriceTotal = normalDayNum.length * roomData.normalDayPrice;
  const holidayPriceTotal = holidayNum.length * roomData.holidayPrice;
  const totalPrice = normalDayPriceTotal + holidayPriceTotal;
  let arr = [...pickDateArr];
  const chkInfo = ` <h3>預約資訊</h3>
  <p>訂房者：${inputName.value}</p>
        <p>入住日期：${arr[0]} ～ ${arr[arr.length - 1]}</p>
        <p>入住天數：${arr.length}</p>
        <p>總價：${totalPrice}</p>`;
  infoDateConfirmInfo.innerHTML = chkInfo;
};

const getData = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${tokenNum}`;
  axios.get(roomApi).then((res) => {
    console.log(res);
    if (res.status === 200) {
      roomData = res.data.room[0];
      roomBookingStatus = res.data.booking;
      getOrderDay(roomBookingStatus);
      render(roomData);
      let amenitiesArry = res.data.room[0].amenities;
      let chkAmenities = Object.keys(amenitiesArry).map((i) => {
        return amenitiesArry[i];
      });
      showAmenities(chkAmenities);
    }
  });
};
getData();

// 渲染設施有無
function showAmenities(obj) {
  obj.forEach((i, index) => {
    let chkIndex = '';
    if (i === false) {
      chkIndex = index;
      console.log(chkIndex);
    }
    const changeOpacity = document.querySelectorAll('.changeOpacity');
    changeOpacity.forEach((j, indexj) => {
      if (indexj === chkIndex) {
        changeOpacity[indexj].style.opacity = 0.3;
      }
    });
  });
}
