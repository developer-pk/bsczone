import { useContext } from 'react'
import IndustryContext from 'app/contexts/admin/industry/IndustryContext'

const useIndustry = () => useContext(IndustryContext)

export default useIndustry
