// Tree Node type declaration
class BtNode<T>{
    
    data: T[];
    left: BtNode<T>;
    right: BtNode<T>;
    level?: number

    constructor(data: any[]) {
        this.data = data;
        this.left = undefined;
        this.right = undefined;
        this.level = undefined;
    }
}

// Tree class
class Bt {

    // Instance
    public root: BtNode<any[]>;

    // Constructor takes a matrix of any type
    constructor(value: any[][]){
        //console.log('Initializing');
        this.init(value);
    }

    // Initializer method
    private init(data: any[][]){

        // Iterate over matrix rows
        for(let i = 0; i < data.length; i++){

            //console.log('Creating Node' + (i + 1));
            // Inject a row into the node creation
            this.create(data[i])
        }
    }   

    // Creation method
    private create(data: any[]){

        //console.log('Checking if node exists...');
        
        // Check if node instance exists
        if(!this.root){
            //console.log('Instantiating new node.');
            this.root = new BtNode<typeof data>(data);
        }
        else{
            //console.log('Using current node.');
            let curr: BtNode<typeof data> = this.root;

            // Populate the nodes
            while(true){

                // Populate the left branch
                if(data < curr.data){

                    //console.log('Assigning left: [' + data + ']');
                    if(curr.left) curr = curr.left;
                    else {
                        curr.left = new BtNode<typeof data>(data);
                        break;
                    }
                }
                // Populate the right branch
                else if (data > curr.data){

                    //console.log('Assigning right: [' + data + ']');
                    if(curr.right) curr = curr.right;
                    else {
                        curr.right = new BtNode<typeof data>(data);
                        break;
                    }
                }
                // Check if array encapsulates objects with an id prop
                else if (data as object[]){

                    // If id is lower, populate left branch
                    if(data[0].id < (curr.data[0] as typeof data[0]).id){
                        
                        //console.log('Assigning left: [' + data + ']');
                        if(curr.left) curr = curr.left;
                        else {
                            curr.left = new BtNode<typeof data>(data);
                            break;
                        }
                    }
                    // If id is larger, populate right branch
                    else if (data[0].id > (curr.data[0] as typeof data[0]).id){

                        //console.log('Assigning right: [' + data + ']');
                        if(curr.right) curr = curr.right;
                        else {
                            curr.right = new BtNode<typeof data>(data);
                            break;
                        }
                    }
                    else break;
                }   

                else break;
            }
        }
    }

    // TODO: Level Order traversal

    // Pre order recursive traversal (root - left - right)
    public preOrder(node: BtNode<any[]>, handle: Function){
        
        // Validate node existence
        if(!node) return;

        // Apply provided function
        handle(node.data);

        // Traverse left side
        this.preOrder(node.left, handle);

        // Traverse right side
        this.preOrder(node.right, handle);
    }

    // In order recursive traversal (left - root - right)
    public inOrder(node: BtNode<any[]>, handle: Function){
       
        // Validate node existence
        if(!node) return;

        // Traverse left side
        this.inOrder(node.left, handle);

        // Apply provided function
        handle(node.data);

        // Traverse right side
        this.inOrder(node.right, handle);
    }

    // Post order recursive traversal (left - right - root)
    public postOrder(node: BtNode<any[]>, handle: Function){
        
        // Validate node existence
        if(!node) return;

        // Traverse left side
        this.postOrder(node.left, handle);

        // Traverse right side
        this.postOrder(node.right, handle);

        // Apply provided function
        handle(node.data);
    }   
}

// Console log wrapper
const wrap = (element) => {
    console.log(element);
}

// Test the tree creation with numbers
console.log('--------------------------------');
let numTree: Bt = new Bt([
    [7,8,9],
    [4,5,6],
    [1,2,3]]
);
console.log(numTree);

console.log('Pre order traversal:')
numTree.preOrder(numTree.root, wrap);

// Test the tree creation with strings
console.log('--------------------------------');
let stringTree: Bt = new Bt([
    ['a','b','c'],
    ['d','e','f'],
    ['g','h','i']]
);
console.log(stringTree);

console.log('Post order traversal:')
stringTree.postOrder(stringTree.root, wrap);

// Test the tree creation with objects
console.log('--------------------------------');
let objectTree: Bt = new Bt([
    [{id: '1', name: 'Henry', job: 'Cook'}], 
    [{id: '2', name: 'Julie', job: 'Engineer'}], 
    [{id: '3', name: 'Steve', job: 'Dev'}]]
)
console.log(objectTree);

console.log('In order traversal:')
objectTree.inOrder(objectTree.root, wrap);