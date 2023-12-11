import Network from '../helper/network'
import MyToken from '../model/MyToken'
import Config from '../../Config.js'
// Apis
import CommentApi from './CommentApi'
import PostApi from './PostApi'
import ReplyApi from './ReplyApi'
import TopicApi from './TopicApi'
import TypeApi from './TypeApi'
import UserApi from './UserApi'
import UtilApi from './UtilApi'


const { APIKEY, BASEURL } = Config
// Network.setConfig(APIKEY,BASEURL)

const APIcreator = async()=>{
    try {
        await Network.init();
    } catch (error) {
        console.log('error in APICREATOR '+ error)
    }
    return {
        CommentApi,
        PostApi,
        ReplyApi,
        TopicApi,
        TypeApi,
        UserApi,
        UtilApi
    }
}
export default APIcreator;