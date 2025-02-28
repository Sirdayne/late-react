import '../../../assets/styles/Honesty/HonestySeed.scss'
import { useL10n } from '@apis-games-front/use-assets'

function HonestySeedsBytes() {
  const CONVERT_SEEDS_TO_BYTES = useL10n(`Honesty.CONVERT_SEEDS_TO_BYTES`)

  return (
    <div className="honesty-seed">
      <div className="honesty-seed-row">
        <div className="honesty-seed-item">
          {CONVERT_SEEDS_TO_BYTES}
        </div>
      </div>

      <div className="honesty-seed-scroll honesty-seed-text">
        <div className="honesty-seed-scroll-title">
          HMAC_SHA256(a3684753f43abd55daac3d59686fe5b620c3088360b67dead5ff80636a3abbb8,::0)
        </div>

        <div className="honesty-seed-scroll-container">
          <div className="honesty-seed-scroll-table">
            {Array.from({ length: 100 }, (_, i) => i).map((item) =>
              <div key={item} className="honesty-seed-cells">
                <div className="honesty-seed-cell">c{item + 2}</div>
                <div className="honesty-seed-cell">{item * 10 + 1}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="honesty-seed-scroll honesty-seed-text">
        <div className="honesty-seed-scroll-title">
          HMAC_SHA256(a3684753f43abd55daac3d59686fe5b620c3088360b67dead5ff80636a3abbb8,::0)
        </div>

        <div className="honesty-seed-scroll-container">
          <div className="honesty-seed-scroll-table">
            {Array.from({ length: 100 }, (_, i) => i).map((item) =>
              <div key={item} className="honesty-seed-cells">
                <div className="honesty-seed-cell">f{item + 3}</div>
                <div className="honesty-seed-cell">{item * 10 + 3}</div>
              </div>,
            )}
          </div>
        </div>
      </div>

      <div className="honesty-seed-scroll honesty-seed-text">
        <div className="honesty-seed-scroll-title">
          HMAC_SHA256(a3684753f43abd55daac3d59686fe5b620c3088360b67dead5ff80636a3abbb8,::0)
        </div>

        <div className="honesty-seed-scroll-container">
          <div className="honesty-seed-scroll-table">
            {Array.from({ length: 100 }, (_, i) => i).map((item) =>
              <div key={item} className="honesty-seed-cells">
                <div className="honesty-seed-cell">c{item + 4}</div>
                <div className="honesty-seed-cell">{item * 10 + 4}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HonestySeedsBytes
