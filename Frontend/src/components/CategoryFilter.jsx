const CategoryFilter = ({ categories, selectedCategory, onSelect }) => {
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
  <div>
    {categories.map(category => (
      <div
        key={category}
        onClick={() => onSelect(category)}
      >
        {capitalize(category)}
      </div>
    ))}
    <h3>Selected: {capitalize(selectedCategory)}</h3>
  </div>
  )
}

export default CategoryFilter
