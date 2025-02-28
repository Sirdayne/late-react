import '../../../assets/styles/Honesty/HonestySeed.scss'
import { useL10n } from '@apis-games-front/use-assets'

function HonestyFinalResult() {
  const HONESTY_FINAL_RESULT = useL10n(`Honesty.FINAL_RESULT`)
  const HONESTY_PAYOUT_RATIO = useL10n(`Honesty.PAYOUT_RATIO`)

  return (
    <div className="honesty-seed">
      <div className="honesty-seed-row">
        <div className="honesty-seed-item">
          {HONESTY_FINAL_RESULT}
        </div>
      </div>

      <div className="honesty-seed-scroll honesty-seed-text">
        <div className="honesty-seed-scroll-title">
          {HONESTY_PAYOUT_RATIO}:
        </div>

        <div className="honesty-seed-scroll-container">
          <div className="honesty-seed-scroll-container_margin-bottom">
            <div className="honesty-seed-scroll-title">
              1 + 1 + 0 + 1 + 1 + 1 + 1 + 1 + 1 + 1 + 0 = 9
            </div>

            <div className="honesty-seed-scroll-table">
              {[24, 6, 3, 1.8, 0.7, 0.5, 0.5, 0.7, 1.8, 3, 6, 24].map((item, index) =>
                <div key={index} className="honesty-seed-cells">
                  <div className="honesty-seed-cell">{index}</div>
                  <div className="honesty-seed-cell">{item}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HonestyFinalResult
