<template>
  <div>
    <button @click="onPayment">
      결제하기
    </button>
  </div>
</template>

<script setup>
const onPayment = () => {
  /* 1. 가맹점 식별하기 */
  const { IMP } = window;
  IMP.init('imp85533822'); // 고객사 식별코드 입력시 실제 결제가 됨

  /* 2. 결제 데이터 정의하기 */
  const data = {
    pg: 'html5_inicis', // 채널로 등록된 PG사만 사용 가능. PG사마다 결제 화면이 달라짐
    pay_method: 'card', // 결제수단
    merchant_uid: `mid_${new Date().getTime()}`, // 주문번호, 실제로는 백엔드에서 연동된 실제 주문 정보 ID를 사용
    amount: 10, // 결제금액
    name: '아임포트 결제 데이터 분석', // 주문명(제품명 등)
    buyer_name: '홍길동', // 구매자 이름
    buyer_tel: '01012341234', // 구매자 전화번호
    buyer_email: 'baroq8@gmail.com', // 구매자 이메일
    buyer_addr: '신사동 661-16', // 구매자 주소
    buyer_postcode: '06018' // 구매자 우편번호
  };

  /* 4. 결제 창 호출하기 */
  IMP.request_pay(data, callback);
};

const callback = (response) => {
  /* 3. 콜백 함수 정의하기 */
  const { success, merchant_uid, error_msg } = response;
  console.log(response);
  if (success) {
    alert('결제 성공');
  } else {
    alert(`결제 실패: ${error_msg}`);
  }
};
</script>