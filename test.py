import os
import shutil
import tkinter as tk
from tkinter import filedialog

# Create the Tkinter root window
root = tk.Tk()
root.withdraw()

# Use the file dialog box to select the directory to be organized
dir_path = filedialog.askdirectory()

# Define the file types and their corresponding folders
file_types = {
    ".pdf": "PDF Files",
    ".docx": "Word Files",
    ".xlsx": "Excel Files",
    ".jpg": "Image Files",
    ".mp3": "Music Files"
}

# Loop through the directory and organize files into their respective folders
for filename in os.listdir(dir_path):
    if os.path.isfile(os.path.join(dir_path, filename)):
        # Get the file extension
        file_ext = os.path.splitext(filename)[1]
        
        # Check if the file extension is in the file_types dictionary
        if file_ext in file_types:
            # Create the folder if it does not exist
            folder_path = os.path.join(dir_path, file_types[file_ext])
            if not os.path.exists(folder_path):
                os.mkdir(folder_path)
            
            # Move the file to the corresponding folder
            file_path = os.path.join(dir_path, filename)
            new_file_path = os.path.join(folder_path, filename)
            shutil.move(file_path, new_file_path)