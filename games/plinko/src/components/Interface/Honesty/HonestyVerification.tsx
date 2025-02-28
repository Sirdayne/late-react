import '../../../assets/styles/Honesty/Honesty.scss'
import '../../../assets/styles/Honesty/HonestySeed.scss'
import '../../../assets/styles/Honesty/HonestyFormField.scss'
import '../../../assets/styles/Honesty/HonestyTable.scss'
import honestyShield from '../../../assets/img/honestyShield.svg'
import { useL10n } from '@apis-games-front/use-assets'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSeedId } from '../../../state/slices/fairnessSlice'
import { getCurrency, getDenominator } from '../../../state/selectors/balanceSelectors'
import loader from '../../../assets/img/loader.png'
import useFormatTime from './hooks/useFairnessTime'
import { openFairnessVerification } from '../../../state/slices/dialogSlice'
import Pagination from '../ui/Pagination'
import {
  getFairnessList,
  getFairnessListLoading,
  getFairnessListPage, getFairnessListPerPage, getFairnessListTotal,
} from '../../../state/selectors/fairnessListSelectors'
import { fetchFairnessList, setFairnessListPage } from '../../../state/slices/fairnessListSlice'

function HonestyVerification({ selectViewSeed }) {
  const HONESTY_MAIN_INFO = useL10n(`Honesty.HONESTY_MAIN_INFO`)
  const HONESTY_MAIN_INFO_TWO = useL10n(`Honesty.HONESTY_MAIN_INFO_TWO`)
  const HONESTY_PAYOUT_PROFIT = useL10n(`Honesty.PAYOUT_PROFIT`)
  const HONESTY_PROVABLE_HONESTY = useL10n(`Honesty.PROVABLE_HONESTY`)
  const HONESTY_TIME = useL10n(`Honesty.TIME`)
  const FORM_BET = useL10n(`Form.BET`)
  const NO_DATA_FOUND = useL10n(`Honesty.NO_DATA_FOUND`)

  const dispatch = useDispatch()
  const list = useSelector(getFairnessList)
  const listLoading = useSelector(getFairnessListLoading)
  const page = useSelector(getFairnessListPage)
  const perPage = useSelector(getFairnessListPerPage)
  const total = useSelector(getFairnessListTotal)
  const currency = useSelector(getCurrency)
  const denominator = useSelector(getDenominator)

  const formatTime = useFormatTime()

  useEffect(() => {
    dispatch(fetchFairnessList(page))
  }, [dispatch, page])

  const showModalFairnessVerification = useCallback(() => {
      dispatch(openFairnessVerification())
    },
    [dispatch]
  )

  const onClickSeed = (seed) => {
    if (seed && seed.isRevealed) {
      dispatch(setSeedId(seed.id))
      selectViewSeed(seed.id)
    } else {
      dispatch(setSeedId(seed.id))
      showModalFairnessVerification()
    }
  }

  const setPage = (newPage) => {
    dispatch(setFairnessListPage(newPage))
  }

  return (
    <div>
      <div className="honesty-subtitle">{HONESTY_PROVABLE_HONESTY}</div>
      <div className="honesty-text">
        {HONESTY_MAIN_INFO}
      </div>
      <div className="honesty-text honesty-text_margin">
        {HONESTY_MAIN_INFO_TWO}
      </div>

      <div className="honesty-table">
        <div className="honesty-table-head">
          <div className="honesty-table-head-cell">{HONESTY_TIME}</div>
          <div className="honesty-table-head-cell honesty-table-head-cell_wide">{FORM_BET}</div>
          <div className="honesty-table-head-cell honesty-table-head-cell_text-right">{HONESTY_PAYOUT_PROFIT}</div>
        </div>

        {listLoading && <div className="honesty-loader-container">
          <div className="honesty-loader">
            <div className="honesty-loader-row">
              <div className="honesty-loader-img">
                <img src={loader} alt="Loader" />
              </div>
            </div>
          </div>
        </div>}

        {!listLoading && list && list.length > 0 && list.map(item => {
          return <div key={item.id}>
            {item && item.formatDate && <div className="honesty-table-hint">{item.formatDate}</div>}

            <div className="honesty-table-row">
              <div className="honesty-table-item">{formatTime(item.time)}</div>
              <div className="honesty-table-item">{item.betAmount / denominator}<span
                className="honesty-table-item_sub">{currency}</span></div>
              <div className="honesty-table-item honesty-table-item_wide honesty-table-item_flex">
                x{item.multiplier}
                <span className="honesty-table-item_separator">/</span>
                {item.winAmount / denominator}
                <span className="honesty-table-item_sub">{currency}</span>
                <span className="honesty-table-item-img">
              <img onClick={() => onClickSeed(item)} src={honestyShield} alt="Icon verify" />
            </span>
              </div>
            </div>
          </div>
        })}

        {!listLoading && list && list.length === 0 && <div className="honesty-text honesty-text-center">{NO_DATA_FOUND}</div>}

        {!listLoading && Math.ceil(total / perPage) > 1 && <div className="honesty-table-pagination">
          <Pagination currentPage={page} totalPages={Math.ceil(total / perPage)} onPageChange={setPage}></Pagination>
        </div>}
      </div>
    </div>
  )
}

export default HonestyVerification
