import './styles/CategoryFilter.css'

const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="category-filter">
      <div className="category-filter-inner">
        {categories.map(category => (
          <button
            key={category}
            type="button"
            className={`category-filter-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelect(category)}
          >
            {capitalize(category)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default CategoryFilter
