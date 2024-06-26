import tkinter as tk
from tkinter import simpledialog, messagebox
import random

class SpinnerWheel:
    def __init__(self, root):
        self.root = root
        self.root.title("Spinner Wheel")
        
        self.names = []
        
        self.canvas = tk.Canvas(root, width=400, height=400)
        self.canvas.pack()
        
        self.add_button = tk.Button(root, text="Add Name", command=self.add_name)
        self.add_button.pack(side=tk.LEFT)
        
        self.spin_button = tk.Button(root, text="Spin", command=self.spin_wheel)
        self.spin_button.pack(side=tk.RIGHT)
        
        self.draw_wheel()
    
    def add_name(self):
        name = simpledialog.askstring("Input", "Enter a name to add:")
        if name:
            self.names.append(name)
            self.draw_wheel()
    
    def draw_wheel(self):
        self.canvas.delete("all")
        
        if not self.names:
            self.canvas.create_text(200, 200, text="No names added", font=("Arial", 24))
            return
        
        num_names = len(self.names)
        angle = 360 / num_names
        
        for i, name in enumerate(self.names):
            start_angle = i * angle
            end_angle = start_angle + angle
            self.canvas.create_arc((50, 50, 350, 350), start=start_angle, extent=angle, fill=self.get_color(i))
            self.canvas.create_text(200, 200, text=name, angle=(start_angle + end_angle) / 2, font=("Arial", 12))
    
    def get_color(self, index):
        colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"]
        return colors[index % len(colors)]
    
    def spin_wheel(self):
        if not self.names:
            messagebox.showinfo("Info", "No names added to spin.")
            return
        
        selected_name = random.choice(self.names)
        messagebox.showinfo("Result", f"The selected name is: {selected_name}")
        

if __name__ == "__main__":
    root = tk.Tk()
    app = SpinnerWheel(root)
    root.mainloop()
