/**
 * Created by ZhangZhiShuo on 2019/4/27 20:14.
 * file description:
 */
import TableStore from '../store/tableStore'
import NewsStore from '../store/newsStore'
import AppStore from '../store/AppStore'
import FindStore from '../store/findStore'
export default function() {
  const tableStore = new TableStore()
  const newsStore=new NewsStore()
  const appStore=new AppStore()
  const findStore=new FindStore()
  return {
    tableStore,
    newsStore,
    appStore,
    findStore
  }
}
