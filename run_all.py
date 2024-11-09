import subprocess
import sys
import os

def run_file(command, file_name):
    try:
        print(f"Running {file_name}...")
        result = subprocess.run(command, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(result.stdout.decode())
    except subprocess.CalledProcessError as e:
        print(f"Error while running {file_name}: {e.stderr.decode()}")
        sys.exit(1)

# Run split.py
if os.path.exists("split.py"):
    run_file([sys.executable, "split.py"], "split.py")
else:
    print("split.py not found!")

# Run merge.py
if os.path.exists("merge.py"):
    run_file([sys.executable, "merge.py"], "merge.py")
else:
    print("merge.py not found!")

# Run objj.js using Node.js
if os.path.exists("objj.js"):
    run_file(["node", "objj.js"], "objj.js")
else:
    print("objj.js not found!")

# Run jsoner.py
if os.path.exists("jsoner.py"):
    run_file([sys.executable, "jsoner.py"], "jsoner.py")
else:
    print("jsoner.py not found!")
