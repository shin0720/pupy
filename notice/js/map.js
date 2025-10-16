function initMap() {
  const center = { lat: 37.5655, lng: 126.8013 };

const cuteMapStyle = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#fff8e7" }] // 전체 배경
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#fce8cdff" }] // 도로
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ec407a" }] // 도로 글씨
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#81d4fa" }] // 물
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#c5e1a5" }] // 공원
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#7e57c2" }] // POI 라벨
  },
  {
    featureType: "administrative",
    elementType: "labels.text.fill",
    stylers: [{ color: "#666666" }] // 행정구역 글씨
  }
];


  const map = new google.maps.Map(document.querySelector(".map"), {
    center: center,
    zoom: 13,
    styles: cuteMapStyle 
  });


  const dogs = [
    {
      name: "콩이",
      age: "11살",
      gender: "남아",
      position: { lat: 37.5333, lng: 126.8419 },
      img: "./image/con2_dog1.jpg"
    },
    {
      name: "티나",
      age: "1살",
      gender: "남아",
      position: { lat: 37.5735, lng: 126.8752 },
      img: "./image/con2_dog2.jpg"
    },
    {
      name: "봄이",
      age: "4살",
      gender: "여아",
      position: { lat: 37.5151, lng: 26.9107 },
      img: "./image/con2_dog3.jpg"
    },
    {
      name: "제니",
      age: "6살",
      gender: "여아",
      position: { lat: 37.4829, lng: 126.9009 },
      img: "./image/con2_dog4.jpg"
    },
    {
      name: "제리",
      age: "7살",
      gender: "남아",
      position: { lat: 37.5214, lng: 126.7674 },
      img: "./image/con2_dog5.jpg"
    },
    {
      name: "탄이",
      age: "5살",
      gender: "남아",
      position: { lat: 37.5516, lng: 126.7398 },
      img: "./image/con2_dog6.jpg"
    },
    {
      name: "최모노",
      age: "3살",
      gender: "남아",
      position: { lat: 37.6125, lng: 126.7307 },
      img: "./image/con2_dog7.jpg"
    },
    {
      name: "별이",
      age: "1살",
      gender: "여아",
      position: { lat: 37.6127, lng: 126.6834 },
      img: "./image/con2_dog8.jpg"
    },
    {
      name: "티슈",
      age: "1살",
      gender: "남아",
      position: { lat: 37.5463, lng: 126.8459 },
      img: "./image/con2_dog9.jpg"
    },
    {
      name: "봄이",
      age: "4살",
      gender: "여아",
      position: { lat: 37.5493, lng: 126.6834 },
      img: "./image/con2_dog10.jpg"
    },
    {
      name: "두부",
      age: "7살",
      gender: "남아",
      position: { lat: 37.5358, lng: 126.8346 },
      img: "./image/con2_dog11.jpg"
    },
    {
      name: "둥이",
      age: "7살",
      gender: "남아",
      position: { lat: 37.5587, lng: 126.9128 },
      img: "./image/con2_dog12.jpg"
    },
    {
      name: "티나",
      age: "9살",
      gender: "여아",
      position: { lat: 37.5263, lng: 126.8752 },
      img: "./image/con2_dog13.jpg"
    },
    {
      name: "이슬",
      age: "11살",
      gender: "여아",
      position: { lat: 37.5169, lng: 126.8665 },
      img: "./image/con2_dog14.jpg"
    },
    {
      name: "단결",
      age: "3살",
      gender: "남아",
      position: { lat: 37.5547, lng: 126.8513 },
      img: "./image/con2_dog15.jpg"
    },
    {
      name: "상추",
      age: "8살",
      gender: "남아",
      position: { lat: 37.5806, lng: 126.8048 },
      img: "./image/con2_dog16.jpg"
    },
    {
      name: "우리",
      age: "9살",
      gender: "남아",
      position: { lat: 37.5984, lng: 126.7667 },
      img: "./image/con2_dog17.jpg"
    },
    {
      name: "이배추",
      age: "2살",
      gender: "남아",
      position: { lat: 37.6069, lng: 126.7262 },
      img: "./image/con2_dog18.jpg"
    },
  ];



  const infoWindow = new google.maps.InfoWindow();


  function createCustomMarkerIcon(dogImg) {
    return new Promise((resolve) => {
      const baseImg = new Image();
      baseImg.src = "./image/marker_1.png"; // 60x90 마커 틀

      const dog = new Image();
      dog.src = dogImg; // 강아지 이미지 (50x50)

      let loaded = 0;
      function checkLoaded() {
        loaded++;
        if (loaded === 2) {
          const canvas = document.createElement("canvas");
          canvas.width = 60;
          canvas.height = 90;
          const ctx = canvas.getContext("2d");

          // 틀 그림
          ctx.drawImage(baseImg, 0, 0, 60, 90);

          // 원형 클리핑 후 강아지 이미지 그림
        ctx.save();
ctx.beginPath();
ctx.arc(30, 30, 25, 0, Math.PI * 2, true);
ctx.closePath();
ctx.clip();
ctx.drawImage(dog, 5, 5, 50, 50);
ctx.restore();

// 그 다음 마커 틀 그림 (앞쪽)
ctx.drawImage(baseImg, 0, 0, 60, 90);

          resolve(canvas.toDataURL());
        }
      }

      baseImg.onload = checkLoaded;
      dog.onload = checkLoaded;
    });
  }

  // 강아지 데이터마다 마커 생성
  dogs.forEach(dog => {
    createCustomMarkerIcon(dog.img).then((iconUrl) => {
      const marker = new google.maps.Marker({
        position: dog.position,
        map: map,
        title: dog.name,
        icon: {
          url: iconUrl,
          scaledSize: new google.maps.Size(60, 90)
        }
      });


    //클릭했을때 프로필창
      marker.addListener("click", () => {
        const content = `
          <div style="text-align:center; font-size:14px;">
            <img src="${dog.img}" alt="${dog.name}" 
                style="width:200px;height:200px;border-radius:10px;margin-bottom:5px;">
            <p><b>이름:</b> ${dog.name}</p>
            <p><b>나이:</b> ${dog.age}</p>
            <p><b>성별:</b> ${dog.gender}</p>
          </div>
        `;
        infoWindow.setContent(content);
        infoWindow.open(map, marker);
      });
    });
  });
}
