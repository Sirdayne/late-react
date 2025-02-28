import '../../../assets/styles/ui/Pagination.scss'
import paginateLeft from '../../../assets/img/paginateLeft.svg'
import paginateRight from '../../../assets/img/paginateRight.svg'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1)

    if (currentPage <= 2) {
      return [1, 2, 3, '...', totalPages]
    }

    if (currentPage >= totalPages - 1) {
      return [1, '...', totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }
  const pages = getPages()

  return (
    <div className="pagination">
      <div
        className={`pagination-arrow ${currentPage === 1 ? "pagination-arrow_disabled" : "pagination-arrow_active"}`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <img src={paginateLeft} alt="" />
      </div>

      {pages.map((page, index) => (
        <div
          key={index}
          className={`pagination-item ${
            page === currentPage ? "pagination-item_active" : "pagination-item_ordinary"
          } ${page === "..." ? "pagination-item_disabled" : ""}`}
          onClick={() => typeof page === 'number' && onPageChange(page)}
        >
          {page}
        </div>
      ))}

      <div
        className={`pagination-arrow ${currentPage === totalPages ? 'pagination-arrow_disabled' : 'pagination-arrow_active'}`}
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
      >
        <img src={paginateRight} alt="" />
      </div>
    </div>
  )
}

export default Pagination
