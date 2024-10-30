export type Position = { x: number; y: number; };
export type Size = { width: number; height: number; };

export type CanvasObject = {
    id: string; 
    type: string;
    position: Position; 
    size: Size;
    color?: string;
    label?: string;
    [key: string]: any;
};

export type Connection = {
    id: string; 
    from: string; 
    to: string; 
    color?: string;
    thickness?: number; 
    arrowHead?: boolean; 
    label?: string; 
    [key: string]: any;
};

export type Workflow = {
    objects: CanvasObject[]; 
    connections: Connection[]; 
};

export function convert(w: Workflow) {

    const module = {"data": {}}
    for (const el of w.objects) {
        module.data[el.id] = {
                    "id": el.id,
                    "name": el.label,
                    "data": {},
                    "class": "welcome",
                    "html": `\n <div>\n   <div class=\"title-box\"><i class=\"fab fa-slack\"></i>${el.label} </div>\n          </div>\n          `,
                    "typenode": false,
                    "inputs": {},
                    "outputs": {},
                    "pos_x": el.position.x,
                    "pos_y": el.position.y
                }
            }
    for (const conn of w.connections) {
        module.data[conn.from].inputs = {
            "input_1" : {
                "connections": [
                    {
                        "node": conn.from,
                        "input": "output_1"
                    }
                ]
            }
        }
        module.data[conn.to].outputs = {
            "output_1": {
                "connections": [
                    {
                        "node": conn.to,
                        "output": "input_1"
                    }
                ]
            }
        }
    }
    return module
}

export const example: Workflow = {
    objects: [
        { id: "1", label: "Rectangle", type: "rectangle", position: { x: 100, y: 200 }, size: { width: 100, height: 50 }, color: "blue" },
        { id: "2", label: "Circle", type: "circle", position: { x: 350, y: 200 }, size: { width: 50, height: 50 }, color: "red" }
    ],
    connections: [
        { id: "c1", from: "1", to: "2", color: "black", thickness: 2, arrowHead: true }
    ]
};

// const serializedData = JSON.stringify(canvasMetadata);
// console.log("Serialized:", serializedData);
// const deserializedData: Workflow = JSON.parse(serializedData);
// console.log("Deserialized:", deserializedData);