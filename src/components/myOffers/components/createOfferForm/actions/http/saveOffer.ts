import Store from '@/Store'
import type IGeneralInfoOfferForm from '../../components/offerInfo/contracts/IGeneralInfoOfferForm'
import castModelToRequest from '../castToRequest'
import useCreateOfferFormStore from '../../store'
import type IOtherRequeriments from '../../components/offerInfo/contracts/IOtherRequeriments'
import type ISalaryForm from '../../components/benefits/contracts/ISalaryForm'

const { getHttp, getPaths } = Store()

const useSaveOfferInfo = async ({
  generalInfo = {} as IGeneralInfoOfferForm,
  otherRequeriments = {} as IOtherRequeriments,
  salary = {} as ISalaryForm,
}) => {
  const { setCurrentOffer, getCurrentOffer } = useCreateOfferFormStore()

  try {
    const { save, update } = getPaths().offer
    const { post } = getHttp()

    const currentOffer = getCurrentOffer()
    const path = currentOffer
      ? update.replace('CAMPAIGN_CODE', String(currentOffer.code))
      : save

    const result = await post(
      path,
      castModelToRequest({
        generalInfoParams: generalInfo,
        otherRequerimentsParams: otherRequeriments,
        salaryParams: salary,
      })
    )

    if (result.status) setCurrentOffer(result.campaign)
  } catch (error) {
    console.log('error', error)
  }
}

export default useSaveOfferInfo
