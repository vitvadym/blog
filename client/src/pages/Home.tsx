import FeaturedPosts from "../components/FeaturedPosts"
import SearchForm from "../components/SearchForm"
import CategoryList from "../components/CategoryList"
import PostsList from "../components/PostsList"

const Home = () => {
  return (
    <>
      <FeaturedPosts />
      <SearchForm />
      <CategoryList />
      <PostsList />
    </>
  )
}

export default Home



