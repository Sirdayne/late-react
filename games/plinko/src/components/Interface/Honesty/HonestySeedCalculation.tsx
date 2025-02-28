import '../../../assets/styles/Honesty/Honesty.scss'
import '../../../assets/styles/Honesty/HonestySeed.scss'
import '../../../assets/styles/Honesty/HonestyFormField.scss'
import { useL10n } from '@apis-games-front/use-assets'

function HonestySeedCalculation() {

  const CONVERT_SEEDS_TO_BYTES = useL10n(`Honesty.CONVERT_SEEDS_TO_BYTES`)

  return (
    <div className="honesty-seed honesty-seed-calculation">
      <div className="honesty-seed-item">
        {CONVERT_SEEDS_TO_BYTES}
      </div>

      <div className="honesty-seed-row">
        <div className="honesty-seed-text">
          (197, 240, 115, 122) [0, ..., 1] = 1
        </div>
      </div>

      <div className="honesty-seed-row">
        <div className="honesty-seed-text honesty-seed-first"></div>
        <div className="honesty-seed-text honesty-seed-second">
          0.769531250000
        </div>
        <div className="honesty-seed-hint honesty-seed-third">
          (197 / (256 ^ 1))
        </div>
      </div>

      <div className="honesty-seed-row-calc">
        <div className="honesty-seed-text honesty-seed-first">
          +
        </div>
        <div className="honesty-seed-text honesty-seed-second">
          0.003662109375
        </div>
        <div className="honesty-seed-hint honesty-seed-third">
          (240 / (256 ^ 2 ))
        </div>
      </div>

      <div className="honesty-seed-row-calc">
        <div className="honesty-seed-text honesty-seed-first">
          +
        </div>
        <div className="honesty-seed-text honesty-seed-second">
          0.000006854534
        </div>
        <div className="honesty-seed-hint honesty-seed-third">
          (115 / (256 ^ 3 ))
        </div>
      </div>

      <div className="honesty-seed-row-calc">
        <div className="honesty-seed-text honesty-seed-first">
          +
        </div>
        <div className="honesty-seed-text honesty-seed-second">
          0.000000028405
        </div>
        <div className="honesty-seed-hint honesty-seed-third">
          (122 / (256 ^ 4 ))
        </div>
      </div>

      <div className="honesty-seed-row-calc">
        <div className="honesty-seed-text honesty-seed-first">
          +
        </div>
        <div className="honesty-seed-text honesty-seed-second">
          0.773200242314
        </div>
        <div className="honesty-seed-hint honesty-seed-third">
          (* 2)
        </div>
      </div>

      <div className="honesty-seed-row-calc">
        <div className="honesty-seed-text honesty-seed-first">
          =
        </div>
        <div className="honesty-seed-text honesty-seed-second">
          1.546400484629
        </div>
        <div className="honesty-seed-hint honesty-seed-third">
        </div>
      </div>
    </div>
  )
}

export default HonestySeedCalculation
