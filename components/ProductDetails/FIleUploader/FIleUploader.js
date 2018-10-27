export default {
    name: 'image-uploader',
    props: {
        oneSide: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            fileList1: [],
            fileList2: [],
            styleObject1: null,
            styleObject2: null
        };
    },
    watch: {
        '$route'(to, from) {
            this._clearUploadedFiles();
        }
    }, 
    methods: {
      
        _clearUploadedFiles() {
            this.fileList1 = [];
            this.fileList2 = [];
            this.styleObject1 = null,
            this.styleObject2 = null,
            this.$refs.upload1.clearFiles();
            this.$refs.upload2.clearFiles();
        },
        handleChange1(file, fileList) {
            this._proccessFiles(file, fileList, 1);
        },

        handleChange2(file, fileList) {
            this._proccessFiles(file, fileList, 2);
        },

        _proccessFiles(file, fileList, side) {

            if (file.raw.type.indexOf('image') != -1) {
                var fr = new FileReader();
                fr.onload = () => {
                    let obj = {
                        'background-image': `url(${fr.result})`,
                        'background-color': 'transparent'
                    };
                    if (side === 1) {
                        this.styleObject1 = obj;
                    } else {
                        this.styleObject2 = obj;
                    }
                };
                fr.readAsDataURL(file.raw);
            }
            if (side === 1) {
                this.fileList1 = fileList.slice(-1);
                this._emitData(side, this.fileList1);
            } else {
                this.fileList2 = fileList.slice(-1);
                this._emitData(side, this.fileList2);
            }
        },

        onHandleRemove1(file, fileList) {
            this._handleRemove(file, fileList, 1);
        },

        onHandleRemove2(file, fileList) {
            this._handleRemove(file, fileList, 2);
        },

        _handleRemove(file, fileList, side) {
            if (side === 1) {
                this.fileList1 = fileList.slice(-1);
                this.styleObject1 = {};
                this._emitData(side, this.fileList1);
            } else {
                this.fileList2 = fileList.slice(-1);
                this.styleObject2 = {};
                this._emitData(side, this.fileList2);
            }
        },
        _emitData(side, list) {
            this.$emit('filelistChange', {
                type: side,
                list: list
            });
        }
    }
};
