/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
const api = 'https://challenge.thef2e.com/api/thef2e2019/stage6/rooms';
const tokenNum = '3LbQ5Nnm3c8nwffY9dBJnV4EdS6wIamHY5TpSDNC0KO3k41xOwll7fAGmexL';
const s = document.getElementById('loading');
const render = (data) => {
  const containerIndex = document.querySelector('.container_Index2');
  let str = '';
  data.forEach((i) => {
    str += `<li>
        <a href="info.html?roomID=${i.id}"><img src="${i.imageUrl}" alt=""></a>
        <p class="room_title">${i.name}</p>
        <div class="room_detail">        
          <div class="room_dayPrice">
            <div class="normalDay">
              <span>NT.${i.normalDayPrice}</span>
              <span class="holiDay">平日</span>
            </div>
            <div class="holiDay">
              <span>NT.${i.holidayPrice}</span>
              <span class="p-r2">假日</span>
            </div>
          </div>
        </div>
      </li>`;
  });
  containerIndex.innerHTML = str;
};
const isLoading = () => {
  document.getElementById('loading').classList.add('loading', 'hideClass');
};
const getData = () => {
  axios.defaults.headers.common.Authorization = `Bearer ${tokenNum}`;
  axios.get(api).then((res) => {
    if (res.status === 200) {
      const roomsData = res.data.items;
      render(roomsData);
      setTimeout(isLoading, 1000);
    }

    // $(window).ready(() => {
    //   $('#loading').hide(1000);
    // });
  });
};

getData();
