/**
 * Author: Lakshman Veti
 * Type: Component
 * Objective: To render file uplaod & list view
 * Associated Route/Usage: /upload
*/


import React, { Component } from "react";
import Dropzone from "../dropzone/Dropzone";
import "./Upload.css";
import Progress from "../progress/Progress";
import errorMessages from '../data/errorMessages';
import { CCollapse, CButtonGroup, CLink, CCard, CCardHeader, CCardBody, CDataTable, CButton } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import fields from '../data/fields';
import uploadService from '../services/uploadService';
import searchService from '../services/searchService';
import commonService from '../services/commonService';
import authService from '../services/authService';
import Loader from "../containers/Loader";
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupBChart2 from '../views/charts/GroupBChart2';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();
//const userObj = authService.getUser();

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      fileList: [],
      baseList: [],
      folders:[],
      selectedFolder:{},
      uploadedFiles:[],
      uploading: true,
      loading: false,
      uploadProgress: {},
      successfullUploaded: false,
      collapsed: true,
      currentFile: 1,
      selectedCard: 'documents',
      user: authService.getUser()
    };

    //this.loadFiles();

    this.setCollapsed = this.setCollapsed.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
    this.setCard = this.setCard.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  
handleChange (option,obj){
  if(option != null){
    this.setState({selectedFolder:option});
    this.setState({uploading:false});
  }else{
    this.setState({selectedFolder:{}});
    this.setState({uploading:true});
  }
  
}

  getCustomerFolders(){

    let selectedCustomer = localStorage.getItem('selectedCustomer');

    searchService.search({type:'customer-folders', customer:((selectedCustomer)?JSON.parse(selectedCustomer).value:null)}).then(res => {
      if(res && res.length>0){
        const _options = [];
        res.forEach(element => {
          _options.push({label: element.S3Folder.folder_name, value: element.S3Folder.folder_name});
        });

        this.setState({}, () => this.setState({ folders:_options}));
        
        if(_options && _options.length != 0)
          this.setState({}, () => this.setState({selectedFolder:_options[0],uploading:false}));
        
      }      
    })
    .catch(err => {
    });
  }

  componentDidMount() {
    this.loadFiles();// load on component mont
    this.getCustomerFolders();
    //this.timer = setInterval(()=> this.loadFiles(), config.filesAutoRefresh); //load for each interval
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  setCard(card) {
    this.setState({ selectedCard: card });
  }

  /**
   * To load user files
  */
  loadFiles() {
    //this.setState({loading:true});
    uploadService.getFiles().then(res => {
      for (var i in res) {
        //format date
        try {
          res[i].createdAt = commonService.getFormattedDate(new Date(res[i].createdAt), 'ddmmyyyy');
          //s.no as index
          res[i].row = Number(i) + 1;
          res[i].filename = res[i].filename.replace(res[i].user + '/', ''); //remove userprefix
        } catch (e) { }
      }
      //this.state.fileList = res;
      this.setState({}, () => this.setState({ loading: false, fileList: res }));//this.forceUpdate();
    })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * To download selected
   * @item (file row object)
  */
  downloadFile(item) {
    this.setState({ loading: true });
    uploadService.downloadFile(item.id).then(res => {
      return res.blob();
      //download(res, item.filename);
    }).then(blob => {
      this.setState({ loading: false });
      require("downloadjs")(blob, item.filename);
    })
      .catch(err => {
        console.log(err);
      });
  }


  /**
   * To remove selected file
   * @item (file row object)
  */
  deleteFile(item) {
    if (!window.confirm(errorMessages.common.delete)) return;
    this.setState({ loading: true });
    uploadService.deleteFile(item.id).then(res => {
      this.setState({ loading: false });
      if (res && res.respStatus && res.respStatus == 500) {
        //this.setState({}, () => this.setState({ loading:false, toast: {show:true, message:'Error ', status:"danger"} }));
        toast.error(errorMessages.delete.failure);
        return;
      }
      //
      let it = this;
      setTimeout(function () {
        if (res) {
          toast.success(errorMessages.delete.success);
          it.loadFiles();
        }
      }, 2000);
    })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    //this.setState({requisitionId:nextProps.params.id});
  }


  setCollapsed() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  onFilesAdded(files) {
    console.log(files)
    files = files.filter((file) => {
      try{
      if(config.allowedExt.indexOf(file.name.split('.').pop()) != -1){
        return true;
      }else{
        toast.error(file.name.split('.').pop() +" type upload not allowed!");
        return false;
      }
      }catch(e){}
    })  
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }


  /**
   * To attach multiple files to send
  */
  async uploadFiles() {
    if(!this.state.selectedFolder.value){
      toast.error("Select customer folder");
      return;
    }
    this.setState({ uploadProgress: {}, uploading: true, loading: true, currentFile: 1 });
    const promises = [];
    this.state.files.forEach((file, index) => {
      // var tmp = await this.sendRequest(file);
      promises.push(this.sendRequest(file, index));
    });
  }

  /**
 * To send multiple files
 * @file attached file
 * @index current index
*/
  sendRequest(file, index) {
    return new Promise((resolve, reject) => {
      this.setState({ currentFile: this.state.currentFile++ })
      let it = this;
      const req = new XMLHttpRequest();
      const formData = new FormData();
      try {
        req.upload.addEventListener("progress", event => {
          if (event.lengthComputable) {
            const copy = { ...this.state.uploadProgress };
            copy[commonService.removeExtension(file.name)] = {
              state: "pending",
              percentage: (event.loaded / event.total) * 100
            };
            this.setState({ uploadProgress: copy });
          }
        });

        req.upload.addEventListener("load", event => {
          const copy = { ...this.state.uploadProgress };
          copy[commonService.removeExtension(file.name)] = { state: "done", percentage: 100 };
          this.setState({ uploadProgress: copy });
          resolve(req.response);
        });

        req.upload.addEventListener("error", event => {
          const copy = { ...this.state.uploadProgress };
          copy[commonService.removeExtension(file.name)] = { state: "error", percentage: 0 };
          this.setState({ uploadProgress: copy });
          reject(req.response);
        });

        formData.append("files", file, file.name);
        req.onreadystatechange = function () {
          //console.log(this.status, this.responseText)
          if (this.status == 200) {
            if(this.responseText){
              var _tmp  = JSON.parse(this.responseText);
              if(_tmp && _tmp.fileUrls && _tmp.fileUrls.length>0 && 
                it.state.uploadedFiles.indexOf(_tmp.fileUrls[0].fname)==-1){ //check response file alrdy there is state
                it.loadFiles(); //update list
                it.state.uploadedFiles.push(_tmp.fileUrls[0].fname);
                if (it.state.uploadedFiles.length == it.state.files.length) {
                  console.log('all uploaded');
                  if(it.state.successfullUploaded == false){
                    toast.success(errorMessages.upload.success);
                    it.setState({ successfullUploaded: true, uploading: false, loading: false });
                    return resolve(this);
                  }
                }
              }
              
              //console.log(it.state.uploadedFiles)
            }
           // console.log(index + 1 , it.state.files.length);
          }
        };
        req.open("POST", `${config.apiUrl.node}/file/multi-upload`);
        //req.open("POST", ` http://18.207.124.230:3000/api/v1/file/multi-upload`);
        req.setRequestHeader("x-access-token", this.state.user.token); //add json auth token
        formData.append("username", this.state.user.username);
        formData.append("folder", this.state.selectedFolder.value);
         req.send(formData);
      } catch (e) {
        console.log(e)
      }
     
    });
  }

  /**
   * To show progressbar for attached file
   * @file attached file
  */
  renderProgress(file) {
    var name = file;
    try {
      name = commonService.removeExtension(name);
    } catch (e) { }
    var uploadProgress = this.state.uploadProgress[name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <span> {uploadProgress ? Math.ceil(uploadProgress.percentage) : ''} % </span>
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.successfullUploaded) {
      return (
        <button className="upload"
          onClick={() =>
            window.location.reload()
          }
        >
          Clear
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-success"
          disabled={this.state.files.length < 0 || this.state.uploading}
          onClick={this.uploadFiles}
          style={{ display: this.state.files.length > 0 ? 'inline' : 'none' }}
        >
          Upload
        </button>
      );
    }
  }

  render() {
    const { collapsed, fileList, loading  } = this.state;
    //console.log(this.state.uploadProgress)
    return (
      <div className="Upload" disabled>
        <Loader params={{ loading }} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <CCard style={{ width: "100%", border: 'none' }}>
          <CCardHeader>
            <CButtonGroup role="group" aria-label="Basic example">
              <CButton color="" onClick={() => this.setCard('documents')}>Documents</CButton>
              <CButton color="" onClick={() => this.setCard('chart')}>Chart</CButton>
            </CButtonGroup>
            <div className="card-header-actions">
              <CLink className="card-header-action" onClick={() => this.setCollapsed(!collapsed)}>
                <CIcon name={collapsed ? 'cil-chevron-bottom' : 'cil-chevron-top'} />
              </CLink>
            </div>
          </CCardHeader>
          <CCardBody>

            <CCollapse show={this.state.collapsed}>
              {/* {this.state.selectedCard == 'chart' &&
                <GroupBChart2 params={{ dashboard: 'alt', period: 18 }} />
              } */}
              {this.state.selectedCard == 'documents' &&
                <div>
                   <div>
                    <Select
                    name="search.folder"
                    placeholder="Select folder for uploading files ..."
                    isClearable={true}
                    components={animatedComponents}
                    value={this.state.selectedFolder}
                    onChange={this.handleChange}
                    className={"folder-selection"}
                    options={this.state.folders}/>
                    </div>
                  <div className="Content">
                   
                    <div style={{ flex: 1 }}>
                      <Dropzone
                        onFilesAdded={this.onFilesAdded}
                        disabled={this.state.uploading || this.state.successfullUploaded}
                      />
                    </div>
                    {/* <div style={{ flex: 1 }}><GroupBChart2 params={{ dashboard: 'alt', period: 6 }} /></div> */}
                  </div>
                  <div className="Actions">{this.renderActions()}</div>

                  <div className="Files">
                    {this.state.files.map(file => {
                      return (
                        <div key={file.name} className="Row">
                          <span className="Filename">{file.name}</span>
                          {this.renderProgress(file.name)}
                          {/* <span>{this.state.uploadProgress.percentage}</span> */}
                        </div>

                      );
                    })}
                  </div>

                  {fileList && fileList?.length>0 &&
                  <CDataTable
                    items={fileList}
                    fields={fields.fileListFields}
                    // columnFilter
                    tableFilter
                    //footer
                    itemsPerPageSelect
                    itemsPerPage={10}
                    hover
                    //striped
                    sorter
                    pagination
                    scopedSlots={{
                      'show_details':
                        (item, index) => {
                          return (
                            <td className="py-2 action">
                              <CButton size="sm"
                                color="success"
                                onClick={() => { this.downloadFile(item) }}
                              >
                                <CIcon name="cil-cloud-download" />
                              </CButton>
                              {/*<CButton size="sm"
                                color="danger"
                                onClick={() => { this.deleteFile(item) }}
                              >
                                <CIcon name="cil-x" />
                              </CButton>*/}
                            </td>
                          )
                        }
                    }}
                  />
                }
                </div>
              }
            </CCollapse>
          </CCardBody>
        </CCard>
      </div>
    );
  }
}

export default Upload;
