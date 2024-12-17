<script setup>
import Button from '@/components/Button.vue';
import Input from '@/components/Input.vue';
import Radio from '@/components/Radio.vue';
import state from '@/views/state';
</script>

<template>
  <div class="profile" v-if="!this.isCreatingInvoice">
    <div class="title">Персональний кабінет</div>
    <div class="account">
      <div class="balance">
        <div class="accName">{{ this.companyName }}</div>
      </div>
      <div class="actions">
        <Button @click="creatingInvoice" value="Створити інвойс" :style="{ width: '170px', 'font-size': '18px', height: '60px', margin: '0 10px 0 0' }"></Button>
        <Button @click="downloadKey" value="Вивантажити ключ доступу" :style="{ width: '170px', 'font-size': '18px', height: '60px', margin: 0 }"></Button>
      </div>
    </div>
    <div class="information">
      Інформація про компанію
      <div class="company-info">
        <div class="company-info-name">Назва компанії</div>
        <div class="company-info-value">{{ this.companyName }}</div>
      </div>
      <div class="company-info">
        <div class="company-info-name">ЄДРПОУ (ІПН)</div>
        <div class="company-info-value">{{ this.edrpou }}</div>
      </div>
      <div class="company-info">
        <div class="company-info-name">Корпоративний номер телефону</div>
        <div class="company-info-value">{{ this.phone }}</div>
      </div>
      <div class="company-info">
        <div class="company-info-name">Корпоративна поштова адреса</div>
        <div class="company-info-value">{{ this.email }}</div>
      </div>
    </div>
    <div class="ibans">
      <div class="bold">
        Реквізити
        <Button @click="addIBAN" value="+" :style="{ width: '40px', padding: 0, height: '35px' }"></Button>
      </div>
      <div class="iban" v-for="(item) in this.ibans" v-if="!this.isAddingIban">
        <div class="iban-wrapper">
          <div class="iban-value">
            <div class="grey">IBAN</div>
            <div> {{ item.iban }}</div>
          </div>
          <div class="iban-description">
            <div class="grey">Послуги за</div>
            <div>"{{ item.destination }}"</div>
          </div>
        </div>
      </div>
      <div class="addingIban" v-if="this.isAddingIban">
        <Input type-of-input="text" placeholder="UA 00 000000 0000000000000000000" label="Введіть IBAN" v-model="this.iban"/>
        <Input type-of-input="text" placeholder="За послуги грумінгу тваринок" label="Введіть назву послуги" v-model="this.destination"/>
        <Button value="Зберегти" @click="addIBANToSate"></Button>
      </div>
    </div>
  </div>

  <div class="wrapper-invoice-create" v-if="this.isCreatingInvoice">
    
    <div class="choose-iban">
      <span class="bold">Виберіть реквізити</span>
      <div class="iban" v-for="(item) in this.ibans">
        <Radio :label="item.destination" v-model="this.pickedIBAN" :id="item.iban" name="IBAN" :value="item.iban"></Radio>
      </div>
      <Input v-model="this.amount" type-of-input="text" placeholder="00,00" label="Вкажіть суму до сплати"/>

      <Input v-model="this.description" type-of-input="text" placeholder="За послуги" label="Введіть призначення платежу"/>
      <div class="bold mt20">Виберіть тип інвойса</div>
      <Radio label="Одноразовий" id="Одноразовий" name="invocieType"></Radio>
      <Radio label="Багаторазовий" id="Багаторазовий" name="invocieType"></Radio>

      <Button @click="createLink" v-if="!this.invoiceCreated" value="Створити посилання"></Button>
      <Button @click="copyLink" v-if="this.invoiceCreated" value="Копіювати посилання"></Button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyName: state.company.name,
      edrpou: state.company.edrpou,
      phone: state.company.phone,
      email: state.company.email,
      ibans: state.company.ibans,
      balance: state.company.balance,
      isAddingIban: false,
      isCreatingInvoice: false,
      iban: '',
      destination: '',
      pickedIBAN: null,
      amount: '',
      invoiceCreated: false,
      description: '',
    };
  },
  methods: {
    addIBAN() {
      this.isAddingIban = true
    },
    addIBANToSate() {
      state.company.ibans.push({
        destination: this.destination,
        iban: this.iban
      })
      this.isAddingIban = false;
      this.iban = ''
      this.destination = ''
    },
    creatingInvoice() {
      this.isCreatingInvoice = true;
    },
    createLink() {
      this.invoiceCreated = true;
    },
    copyLink() {
      localStorage.setItem('invoice', JSON.stringify({
        description: this.description,
        amount: this.amount,
        iban: this.pickedIBAN,
        serviceDestination: state.company.ibans.find((i) => i.iban === this.pickedIBAN).destination
      }))
      const tempInput = document.createElement('input');
      tempInput.value = 'http://localhost:5173/invoice/f46b72a0-8ebf-4e97-8078-29f72cb82ba7';
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      this.isCreatingInvoice = false;
      this.invoiceCreated = false;
    },
    downloadKey() {
      const url = 'data:application/pdf;base64,LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdDJGMVdwNlBvNTNWbHBnNXJpNWs1Vw0KWnV0eGVXZXJkOW81cDEva3UzVzFRaEVneFdFVTE0MjN4ZGcwa1VzcC8zL3JidStsL0ROVGxTLzlZdlNNL0lCRWZCeE4yDQpUcTE5MzY1SUZmQ3R4eklzMWxSNHNuQkdLS0R4T1NmMjJxTVdobnhiSHVCYmpWRXlZU3cxVnU1azFybVdjM3Y4aFpMeEQNCi84R05wUW5yQWFlMW4xa091dm51M3dFY3YzcHU1YlJTSmRxdWh4djh5NTFmRFgrU0hlZjE1bUdnclFwWmYwVmlUb1V2Vw0KYklIQm9KRjM1c1pPV3o1V25MbUg1M29kMVhxM0ZqeDNCVHhKdk92MHpwZHlUdVRFTWJBYXlXSUsyQnlRTGI3WGZWSTJQDQpDTUpDcGVhN3RucU9mNUxmSXFRRTNwR1p5RW43RWlSb2k0RzZyMExzUFord0lEQVFBQg0KLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t';
      const link = document.createElement('a')
      link.href = url
      link.download = 'pub_key.key'
      link.click()
      URL.revokeObjectURL(link.href)
    }
  }
}
</script>

<style scoped>
.profile {
  width: 900px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}
.title {
  font-size: 30px;
  font-weight: bold;
}
.account {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
}
.balance {
  display: flex;
  flex-direction: column;
}
.accName {
  font-size: 20px;
  font-weight: bold;
}
.bills {
  color: rgb(125, 125, 125);
}
.information {
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.bold {
  font-weight: bold;
}
.company-info {
  border-top: 2px solid rgb(225, 225, 225);
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 40px;
}
.grey {
  color: rgb(154, 154, 154);
}
.company-info-name {
  color: rgb(154, 154, 154);
  font-size: 20px;
  font-weight: normal;
  display: flex;
  align-items: center;
  width: 200px;
}
.company-info-value {
  font-size: 20px;
  font-weight: normal;
  display: flex;
  align-items: center;
}
.iban-wrapper {
  display: flex;
  flex-direction: row;
}
.iban-value {
  width: 400px;
}
.ibans {
  font-size: 20px;
  margin-top: 20px;
}
.iban {
  border-top: 2px solid rgb(225, 225, 225);
  margin-top: 20px;
  height: 50px;
  display: flex;
  align-items: center;
}
.actions {
  display: flex;
  flex-direction: row;
}
.wrapper-invoice-create {
  width: 900px;
}
.choose-iban {
  display: flex;
  justify-content: flex-start;
  align-content: space-between;
  flex-direction: column;
  font-size: 22px;
  width: 550px;
  height: 500px;
}
.mt20 {
  margin-top: 20px;
}
</style>